import pygame
import math

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Arrow Shooting Game')

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Arrow settings
ARROW_WIDTH, ARROW_HEIGHT = 60, 10
arrow_speed = 10
arrow_angle = 0
arrow_position = [WIDTH // 2, HEIGHT // 2]

# Font
font = pygame.font.SysFont(None, 36)

def draw_arrow(position, angle):
    rotated_arrow = pygame.transform.rotate(pygame.Surface((ARROW_WIDTH, ARROW_HEIGHT)), angle)
    rotated_arrow.fill(BLACK)
    rect = rotated_arrow.get_rect(center=position)
    screen.blit(rotated_arrow, rect.topleft)

def main():
    global arrow_angle, arrow_position
    clock = pygame.time.Clock()
    running = True
    arrow_flying = False
    arrow_velocity = [0, 0]

    while running:
        screen.fill(WHITE)
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        keys = pygame.key.get_pressed()
        
        if keys[pygame.K_LEFT]:
            arrow_angle += 5
        if keys[pygame.K_RIGHT]:
            arrow_angle -= 5
        if keys[pygame.K_SPACE] and not arrow_flying:
            arrow_flying = True
            arrow_velocity = [
                arrow_speed * math.cos(math.radians(arrow_angle)),
                -arrow_speed * math.sin(math.radians(arrow_angle))
            ]

        if arrow_flying:
            arrow_position[0] += arrow_velocity[0]
            arrow_position[1] += arrow_velocity[1]
            if (arrow_position[0] < 0 or arrow_position[0] > WIDTH or
                arrow_position[1] < 0 or arrow_position[1] > HEIGHT):
                arrow_flying = False
                arrow_position = [WIDTH // 2, HEIGHT // 2]
        
        draw_arrow(arrow_position, arrow_angle)

        # Display angle on the screen
        angle_text = font.render(f'Angle: {arrow_angle:.2f}', True, BLACK)
        screen.blit(angle_text, (10, 10))

        pygame.display.flip()
        clock.tick(30)

    pygame.quit()

if __name__ == "__main__":
    main()
