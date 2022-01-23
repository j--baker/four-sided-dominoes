class Cell {
	// Could use Symbol.for(...) and keyFor(...) if global is OK.
	static NORTH = Symbol('NORTH');
	static EAST  = Symbol('EAST');
	static SOUTH = Symbol('SOUTH');
	static WEST  = Symbol('WEST');

	// Use an IIFE.  Older browsers do not support static initialization blocks.
	static NULL_CELL = ( function() {
		const cell = new Cell();
		cell.name = 'NULL';
		cell.north = cell;
		cell.east  = cell;
		cell.south = cell;
		cell.west  = cell;

		return cell;
	} )();

	constructor(
		{
			neighbors: {
				[Cell.NORTH]: northNeighbor,
				[Cell.EAST]:  eastNeighbor,
				[Cell.SOUTH]: southNeighbor,
				[Cell.WEST]:  westNeighbor,
			},
			name: name,
			tile: tile,
		} = {
			neighbors: {
				[Cell.NORTH]: Cell.NULL_CELL,
				[Cell.EAST]:  Cell.NULL_CELL,
				[Cell.SOUTH]: Cell.NULL_CELL,
				[Cell.WEST]:  Cell.NULL_CELL,
			},
			name: "",
			tile: null,
		}
	) {
		this.neighbors = {
			[Cell.NORTH]: northNeighbor,
			[Cell.EAST]:  eastNeighbor,
			[Cell.SOUTH]: southNeighbor,
			[Cell.WEST]:  westNeighbor,
		};

		this.name = name;
		this.tile = tile;
	}

	get isNull() { return this === Cell.NULL_CELL; }

	get north() { return this.neighbors[Cell.NORTH]; }
	set north( cell ) { this.neighbors[Cell.NORTH] = cell != undefined ? cell : Cell.NULL_CELL; }

	get east() { return this.neighbors[Cell.EAST]; }
	set east( cell ) { this.neighbors[Cell.EAST] = cell != undefined ? cell : Cell.NULL_CELL; }

	get south() { return this.neighbors[Cell.SOUTH]; }
	set south( cell ) { this.neighbors[Cell.SOUTH] = cell != undefined ? cell : Cell.NULL_CELL; }

	get west() { return this.neighbors[Cell.WEST]; }
	set west( cell ) { this.neighbors[Cell.WEST] = cell != undefined ? cell : Cell.NULL_CELL; }

	toString() {
		return `{ Cell(${+this}): "${this.name}" -> ${this.tile} }`;
	}

	[Symbol.toPrimitive]( hint ) {
		if (hint === 'number') {
			return ( this.north.isNull ? 0 : 1 )
				+ ( this.east.isNull ? 0 : 1 )
				+ ( this.south.isNull ? 0 : 1 )
				+  ( this.west.isNull ? 0 : 1 );
		} else if (hint === 'string') {
			// Reconnect the toString() method.
			return this.toString();
		}

		return null;
	}

}
