// src/lib/uuidv1.ts
// Fully fixed, SSR-safe, BigInt-safe, console-debugged RFC 4122 v1 UUID generator

let lastTimestamp = 0n;
let clockSequence = 0;
let node = new Uint8Array(6);

// Run only in browser
if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
	try {
		crypto.getRandomValues(node);
		node[0] |= 0x01; // multicast bit → RFC compliant random node
		console.log('[UUIDv1] Random node generated:', Array.from(node).map(b => b.toString(16).padStart(2, '0')).join(''));

		const clockBuf = new Uint8Array(2);
		crypto.getRandomValues(clockBuf);
		clockSequence = ((clockBuf[0] << 8) | clockBuf[1]) & 0x3fff;
		console.log('[UUIDv1] Random clock sequence:', clockSequence);
	} catch (e) {
		console.error('[UUIDv1] Failed to initialize crypto:', e);
	}
}

function hexToBytes(hex: string): Uint8Array {
	try {
		const clean = hex.replace(/[^0-9a-fA-F]/g, '').slice(0, 12).padEnd(12, '0');
		const bytes = new Uint8Array(6);
		for (let i = 0; i < 12; i += 2) {
			bytes[i / 2] = parseInt(clean.slice(i, i + 2), 16);
		}
		console.log('[UUIDv1] Custom node parsed:', clean);
		return bytes;
	} catch (e) {
		console.error('[UUIDv1] Invalid custom node, using random:', e);
		return node;
	}
}

export function generateUuidV1(
	customNode?: string,
	customClockSeq?: number
): string {
	try {
		const now = Date.now();
		const timestampMs = BigInt(now);
		const timestamp100ns = timestampMs * 10_000n + 0x01b21dd213814000n;

		// Clock sequence monotonicity (RFC 4122 §4.2.1.1)
		if (timestamp100ns <= lastTimestamp) {
			clockSequence = (clockSequence + 1) & 0x3fff;
			console.log('[UUIDv1] Clock regression → new clockSequence:', clockSequence);
		}
		lastTimestamp = timestamp100ns;

		const useNode = customNode ? hexToBytes(customNode) : node;
		const useClockSeq = customClockSeq !== undefined ? customClockSeq & 0x3fff : clockSequence;

		// Build 16-byte buffer using only safe Number() casts on 32/16-bit parts
		const buf = new ArrayBuffer(16);
		const view = new DataView(buf);

		// time_low (32-bit)
		view.setUint32(0, Number(timestamp100ns & 0xffffffffn));
		// time_mid (16-bit)
		view.setUint16(4, Number((timestamp100ns >> 32n) & 0xffffn));
		// time_hi_and_version (12-bit time + 4-bit version=1)
		view.setUint16(6, Number(((timestamp100ns >> 48n) & 0x0fffn) | 0x1000n));
		// clock_seq_hi_res (variant 10xx + high 6 bits of clock_seq)
		view.setUint8(8, 0x80 | ((useClockSeq >> 8) & 0x3f));
		// clock_seq_low (8 bits)
		view.setUint8(9, useClockSeq & 0xff);
		// node (48 bits)
		for (let i = 0; i < 6; i++) {
			view.setUint8(10 + i, useNode[i]);
		}

		// Convert to hex string with hyphens
		const bytes = new Uint8Array(buf);
		const hex = Array.from(bytes)
			.map(b => b.toString(16).padStart(2, '0'))
			.join('');

		const formatted = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;

		console.log('[UUIDv1] Generated:', formatted);
		return formatted;
	} catch (error) {
		console.error('[UUIDv1] Generation failed:', error);
		return '00000000-0000-1000-8000-000000000000'; // fallback safe UUID
	}
}

export function extractTimestamp(uuid: string): number | null {
	try {
		const clean = uuid.replace(/-/g, '');
		if (!/^[0-9a-f]{32}$/i.test(clean)) throw new Error('Invalid format');

		const timeLow = BigInt('0x' + clean.slice(0, 8));
		const timeMid = BigInt('0x' + clean.slice(8, 12));
		const timeHi = BigInt('0x' + clean.slice(12, 16));

		const ts100ns = (timeHi << 48n) | (timeMid << 32n) | timeLow;
		const unixMs = Number((ts100ns - 0x01b21dd213814000n) / 10_000n);

		console.log('[UUIDv1] Extracted timestamp (ms):', unixMs);
		return unixMs > 0 ? unixMs : null;
	} catch (e) {
		console.warn('[UUIDv1] Timestamp extraction failed:', e);
		return null;
	}
}