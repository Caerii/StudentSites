import pygame
import random
import time

# Initialize pygame
pygame.init()

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (213, 50, 80)
GREEN = (0, 255, 0)

# Screen dimensions
WIDTH = 600
HEIGHT = 400

# Create the display
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Snake Game with Guns')

# Load USA flag image
background_image = pygame.image.load('usa_flag.png')
background_image = pygame.transform.scale(background_image, (WIDTH, HEIGHT))  # Resize to fit screen

# Clock
clock = pygame.time.Clock()

# Snake properties
snake_block = 10
snake_speed = 10  # Starting speed

# Bullet properties
bullet_speed = 20
bullets = []  # Initialize bullets list

# Score
score = 0

# Font styles
font_style = pygame.font.SysFont("bahnschrift", 25)

def draw_snake(snake_block, snake_list):
    for segment in snake_list:
        pygame.draw.rect(screen, BLACK, [segment[0], segment[1], snake_block, snake_block])

def draw_bullets(bullets):
    for bullet in bullets:
        pygame.draw.rect(screen, RED, [bullet[0], bullet[1], snake_block, snake_block])

def draw_food(foods):
    for food in foods:
        pygame.draw.rect(screen, GREEN, [food[0], food[1], snake_block, snake_block])

def display_message(msg, color):
    mesg = font_style.render(msg, True, color)
    screen.blit(mesg, [WIDTH / 6, HEIGHT / 3])

def display_score(score):
    value = font_style.render(f"Score: {score}", True, WHITE)
    screen.blit(value, [0, 0])

def random_position(snake_list=[]):
    while True:
        x = round(random.randrange(0, WIDTH - snake_block) / 10.0) * 10.0
        y = round(random.randrange(0, HEIGHT - snake_block) / 10.0) * 10.0
        if [x, y] not in snake_list:
            return x, y

def loading_screen():
    screen.fill(BLACK)
    loading_text = font_style.render("Fortnite Not Loading...", True, WHITE)  # Updated text
    screen.blit(loading_text, [WIDTH / 2 - 100, HEIGHT / 2 - 25])  # Center the text
    pygame.display.update()
    time.sleep(2)  # Duration of loading screen

def game_loop():
    global snake_speed, bullets  # Declare variables as global
    global score  # Declare score as global
    game_over = False
    game_close = False

    x1, y1 = WIDTH / 2, HEIGHT / 2
    x1_change, y1_change = 0, 0

    snake_list = []
    length_of_snake = 1

    # Generate initial food items
    foods = [random_position(snake_list) for _ in range(5)]  # Create 5 food items

    while not game_over:

        while game_close:
            screen.blit(background_image, (0, 0))  # Draw background
            display_message("You Lost! Press C-Play Again or Q-Quit", RED)
            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_q:
                        game_over = True
                        game_close = False
                    if event.key == pygame.K_c:
                        score = 0  # Reset score on restart
                        game_loop()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    x1_change = -snake_block
                    y1_change = 0
                elif event.key == pygame.K_RIGHT:
                    x1_change = snake_block
                    y1_change = 0
                elif event.key == pygame.K_UP:
                    y1_change = -snake_block
                    x1_change = 0
                elif event.key == pygame.K_DOWN:
                    y1_change = snake_block
                    x1_change = 0

        # Move the snake
        x1 += x1_change
        y1 += y1_change

        # Check for wall collision and teleport
        if x1 >= WIDTH or x1 < 0 or y1 >= HEIGHT or y1 < 0:
            x1, y1 = random_position(snake_list)

        screen.blit(background_image, (0, 0))  # Draw background

        # Draw food items
        draw_food(foods)

        # Move bullets
        for bullet in bullets:
            if x1_change != 0:  # Moving horizontally
                bullet[0] += bullet_speed * (1 if x1_change > 0 else -1)
            elif y1_change != 0:  # Moving vertically
                bullet[1] += bullet_speed * (1 if y1_change > 0 else -1)

        # Check for bullet collisions with food
        for food in foods[:]:  # Iterate over a copy of the list
            for bullet in bullets[:]:  # Check each bullet
                if bullet[0] == food[0] and bullet[1] == food[1]:  # Collision detected
                    bullets.remove(bullet)  # Remove the bullet
                    foods.remove(food)  # Remove the food
                    length_of_snake += 1  # Increase snake length
                    score += 1  # Increase score
                    foods.append(random_position(snake_list))  # Add new food
                    break  # Exit the loop after collision

        # Remove bullets that are out of bounds
        bullets = [bullet for bullet in bullets if 0 <= bullet[0] < WIDTH and 0 <= bullet[1] < HEIGHT]

        # Draw snake
        snake_head = [x1, y1]
        snake_list.append(snake_head)
        if len(snake_list) > length_of_snake:
            del snake_list[0]

        # Check for self-collision
        if snake_head in snake_list[:-1]:
            game_close = True

        draw_snake(snake_block, snake_list)
        draw_bullets(bullets)
        display_score(score)  # Display the score
        pygame.display.update()

        # Check for food collision with snake (optional)
        for food in foods:
            if x1 == food[0] and y1 == food[1]:
                foods.remove(food)  # Remove food that was eaten
                length_of_snake += 1
                score += 1  # Increase score
                foods.append(random_position(snake_list))

        clock.tick(snake_speed)

    pygame.quit()
    quit()

# Show loading screen before starting the game
loading_screen()
game_loop()
