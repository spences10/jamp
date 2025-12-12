// Markdown token types
export type TokenType =
	| 'heading'
	| 'paragraph'
	| 'code_block'
	| 'blockquote'
	| 'list'
	| 'list_item'
	| 'hr'
	| 'table'
	| 'text'
	| 'bold'
	| 'italic'
	| 'strikethrough'
	| 'code'
	| 'link'
	| 'image'
	| 'br';

export interface Token {
	type: TokenType;
	raw: string;
	// Heading
	depth?: number;
	// Code block
	lang?: string;
	// List
	ordered?: boolean;
	start?: number;
	// Table
	header?: string[];
	align?: ('left' | 'center' | 'right' | null)[];
	rows?: string[][];
	// Link/Image
	href?: string;
	title?: string;
	alt?: string;
	// Children (for nested content)
	children?: Token[];
	// Text content
	text?: string;
}

// Block-level patterns
const PATTERNS = {
	heading: /^(#{1,6})\s+(.+)$/,
	code_block: /^```(\w*)\n([\s\S]*?)```$/,
	hr: /^(?:[-*_]){3,}\s*$/,
	blockquote: /^>\s?(.*)$/,
	ul_item: /^[-*+]\s+(.+)$/,
	ol_item: /^(\d+)\.\s+(.+)$/,
	table_row: /^\|(.+)\|$/,
	table_align: /^\|(?:\s*:?-+:?\s*\|)+$/,
};

export function tokenize(markdown: string): Token[] {
	const lines = markdown.split('\n');
	const tokens: Token[] = [];
	let i = 0;

	while (i < lines.length) {
		const line = lines[i];

		// Empty line
		if (line.trim() === '') {
			i++;
			continue;
		}

		// Code block (fenced)
		if (line.startsWith('```')) {
			const lang = line.slice(3).trim();
			const codeLines: string[] = [];
			i++;
			while (i < lines.length && !lines[i].startsWith('```')) {
				codeLines.push(lines[i]);
				i++;
			}
			tokens.push({
				type: 'code_block',
				raw: codeLines.join('\n'),
				lang: lang || undefined,
				text: codeLines.join('\n'),
			});
			i++; // skip closing ```
			continue;
		}

		// Heading
		const headingMatch = line.match(PATTERNS.heading);
		if (headingMatch) {
			tokens.push({
				type: 'heading',
				raw: line,
				depth: headingMatch[1].length,
				children: tokenizeInline(headingMatch[2]),
			});
			i++;
			continue;
		}

		// HR
		if (PATTERNS.hr.test(line)) {
			tokens.push({ type: 'hr', raw: line });
			i++;
			continue;
		}

		// Blockquote
		if (line.startsWith('>')) {
			const quoteLines: string[] = [];
			while (
				i < lines.length &&
				(lines[i].startsWith('>') || lines[i].trim() === '')
			) {
				if (lines[i].startsWith('>')) {
					quoteLines.push(lines[i].replace(/^>\s?/, ''));
				} else if (quoteLines.length > 0) {
					quoteLines.push('');
				}
				i++;
				if (lines[i]?.trim() === '' && !lines[i + 1]?.startsWith('>'))
					break;
			}
			tokens.push({
				type: 'blockquote',
				raw: quoteLines.join('\n'),
				children: tokenize(quoteLines.join('\n')),
			});
			continue;
		}

		// Table
		if (
			PATTERNS.table_row.test(line) &&
			i + 1 < lines.length &&
			PATTERNS.table_align.test(lines[i + 1])
		) {
			const headerCells = parseTableRow(line);
			const alignRow = lines[i + 1];
			const align = parseTableAlign(alignRow);
			const rows: string[][] = [];
			i += 2;
			while (i < lines.length && PATTERNS.table_row.test(lines[i])) {
				rows.push(parseTableRow(lines[i]));
				i++;
			}
			tokens.push({
				type: 'table',
				raw: line,
				header: headerCells,
				align,
				rows,
			});
			continue;
		}

		// Unordered list
		if (PATTERNS.ul_item.test(line)) {
			const items = parseList(lines, i, false);
			tokens.push({
				type: 'list',
				raw: '',
				ordered: false,
				children: items.items,
			});
			i = items.endIndex;
			continue;
		}

		// Ordered list
		if (PATTERNS.ol_item.test(line)) {
			const items = parseList(lines, i, true);
			const startMatch = line.match(PATTERNS.ol_item);
			tokens.push({
				type: 'list',
				raw: '',
				ordered: true,
				start: startMatch ? parseInt(startMatch[1]) : 1,
				children: items.items,
			});
			i = items.endIndex;
			continue;
		}

		// Paragraph (default)
		const paragraphLines: string[] = [];
		while (
			i < lines.length &&
			lines[i].trim() !== '' &&
			!lines[i].startsWith('#') &&
			!lines[i].startsWith('```') &&
			!lines[i].startsWith('>') &&
			!PATTERNS.hr.test(lines[i]) &&
			!PATTERNS.ul_item.test(lines[i]) &&
			!PATTERNS.ol_item.test(lines[i]) &&
			!(
				PATTERNS.table_row.test(lines[i]) &&
				PATTERNS.table_align.test(lines[i + 1] || '')
			)
		) {
			paragraphLines.push(lines[i]);
			i++;
		}
		if (paragraphLines.length > 0) {
			tokens.push({
				type: 'paragraph',
				raw: paragraphLines.join('\n'),
				children: tokenizeInline(paragraphLines.join('\n')),
			});
		}
	}

	return tokens;
}

function tokenizeInline(text: string): Token[] {
	const tokens: Token[] = [];
	let remaining = text;

	// Process inline elements in order of precedence
	while (remaining.length > 0) {
		let matched = false;

		// Image (must come before link)
		const imageMatch = remaining.match(
			/^!\[([^\]]*)\]\(([^)]+?)(?:\s+"([^"]+)")?\)/,
		);
		if (imageMatch) {
			tokens.push({
				type: 'image',
				raw: imageMatch[0],
				alt: imageMatch[1],
				href: imageMatch[2],
				title: imageMatch[3],
			});
			remaining = remaining.slice(imageMatch[0].length);
			matched = true;
			continue;
		}

		// Link
		const linkMatch = remaining.match(
			/^\[([^\]]+)\]\(([^)]+?)(?:\s+"([^"]+)")?\)/,
		);
		if (linkMatch) {
			tokens.push({
				type: 'link',
				raw: linkMatch[0],
				text: linkMatch[1],
				href: linkMatch[2],
				title: linkMatch[3],
				children: tokenizeInline(linkMatch[1]),
			});
			remaining = remaining.slice(linkMatch[0].length);
			matched = true;
			continue;
		}

		// Bold
		const boldMatch = remaining.match(/^\*\*(.+?)\*\*|^__(.+?)__/);
		if (boldMatch) {
			tokens.push({
				type: 'bold',
				raw: boldMatch[0],
				children: tokenizeInline(boldMatch[1] || boldMatch[2]),
			});
			remaining = remaining.slice(boldMatch[0].length);
			matched = true;
			continue;
		}

		// Strikethrough
		const strikeMatch = remaining.match(/^~~(.+?)~~/);
		if (strikeMatch) {
			tokens.push({
				type: 'strikethrough',
				raw: strikeMatch[0],
				children: tokenizeInline(strikeMatch[1]),
			});
			remaining = remaining.slice(strikeMatch[0].length);
			matched = true;
			continue;
		}

		// Italic (must come after bold)
		const italicMatch = remaining.match(/^\*([^*]+?)\*|^_([^_]+?)_/);
		if (italicMatch) {
			tokens.push({
				type: 'italic',
				raw: italicMatch[0],
				children: tokenizeInline(italicMatch[1] || italicMatch[2]),
			});
			remaining = remaining.slice(italicMatch[0].length);
			matched = true;
			continue;
		}

		// Inline code
		const codeMatch = remaining.match(/^`([^`]+)`/);
		if (codeMatch) {
			tokens.push({
				type: 'code',
				raw: codeMatch[0],
				text: codeMatch[1],
			});
			remaining = remaining.slice(codeMatch[0].length);
			matched = true;
			continue;
		}

		// Line break (two spaces at end)
		if (remaining.match(/^  \n/)) {
			tokens.push({ type: 'br', raw: '  \n' });
			remaining = remaining.slice(3);
			matched = true;
			continue;
		}

		// Plain text - consume until next potential match
		if (!matched) {
			const nextSpecial = remaining.slice(1).search(/[*_`~\[!]/);
			const textEnd =
				nextSpecial === -1 ? remaining.length : nextSpecial + 1;
			const textContent = remaining.slice(0, textEnd);

			// Merge with previous text token if possible
			const lastToken = tokens[tokens.length - 1];
			if (lastToken?.type === 'text') {
				lastToken.text = (lastToken.text || '') + textContent;
				lastToken.raw += textContent;
			} else {
				tokens.push({
					type: 'text',
					raw: textContent,
					text: textContent,
				});
			}
			remaining = remaining.slice(textEnd);
		}
	}

	return tokens;
}

function parseList(
	lines: string[],
	startIndex: number,
	ordered: boolean,
): { items: Token[]; endIndex: number } {
	const items: Token[] = [];
	let i = startIndex;
	const pattern = ordered ? PATTERNS.ol_item : PATTERNS.ul_item;

	while (i < lines.length) {
		const line = lines[i];
		const match = line.match(pattern);

		if (match) {
			const content = ordered ? match[2] : match[1];
			items.push({
				type: 'list_item',
				raw: line,
				children: tokenizeInline(content),
			});
			i++;
		} else if (line.trim() === '') {
			// Empty line might end list or continue it
			if (i + 1 < lines.length && pattern.test(lines[i + 1])) {
				i++;
			} else {
				break;
			}
		} else {
			break;
		}
	}

	return { items, endIndex: i };
}

function parseTableRow(line: string): string[] {
	return line
		.slice(1, -1) // Remove outer pipes
		.split('|')
		.map((cell) => cell.trim());
}

function parseTableAlign(
	line: string,
): ('left' | 'center' | 'right' | null)[] {
	return line
		.slice(1, -1)
		.split('|')
		.map((cell) => {
			const trimmed = cell.trim();
			const left = trimmed.startsWith(':');
			const right = trimmed.endsWith(':');
			if (left && right) return 'center';
			if (right) return 'right';
			if (left) return 'left';
			return null;
		});
}

// Escape HTML to prevent XSS
export function escapeHtml(text: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;',
	};
	return text.replace(/[&<>"']/g, (char) => map[char]);
}
