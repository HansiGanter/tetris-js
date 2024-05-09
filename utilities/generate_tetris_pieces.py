import svgwrite
import random

def create_tetris_piece(dwg, insert, piece_type, rotation):
    """Draw a Tetris piece at a specific location with a given rotation."""
    unit = 20  # Size of one block of the piece
    shapes = {
        'I': [(2, 0), (2, 1), (2, 2), (2, 3)],
        'O': [(1, 1), (2, 1), (1, 2), (2, 2)],
        'T': [(2, 1), (1, 2), (2, 2), (3, 2)],
        'S': [(2, 1), (3, 1), (1, 2), (2, 2)],
        'Z': [(1, 1), (2, 1), (2, 2), (3, 2)],
        'J': [(1, 1), (1, 2), (2, 2), (3, 2)],
        'L': [(3, 1), (1, 2), (2, 2), (3, 2)]
    }

    # Choose the coordinates for the piece type
    coords = shapes[piece_type]

    # Apply rotation (0, 90, 180, 270 degrees)
    if rotation == 90:
        coords = [(y, -x+3) for x, y in coords]
    elif rotation == 180:
        coords = [(-x+4, -y+3) for x, y in coords]
    elif rotation == 270:
        coords = [(-y+3, x-1) for x, y in coords]

    # Draw the piece using rectangles
    for x, y in coords:
        dwg.add(dwg.rect(insert=(insert[0] + x * unit, insert[1] + y * unit), size=(unit, unit), fill='#D9D9D9'))

def main():
    # Create an SVG drawing
    dwg = svgwrite.Drawing('tetris_pieces.svg',(1080, 620), profile='full')
# height="620" version="1.1" width="1070"

    # Randomly add Tetris pieces
    pieces = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']
    y = 0
    x = 0
    for i in range(84):  # Change this number to draw more or fewer pieces
        piece_type = random.choice(pieces)
        rotation = random.choice([0, 90, 180, 270])
        create_tetris_piece(dwg, (x, y), piece_type, rotation)
        x += 90
        if x >= 1000:
            y += 90
            x = 0

    # Save the SVG file
    dwg.save()

if __name__ == '__main__':
    main()
