import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Aaron's Tiny Site lol</h1>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <div className="space-y-2 mb-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  This site is about Aaron I guess
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A very cool guy who is nerdy
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lx1536u56ag91-i91RJZ2Mv64O8MPXXRkMfAZaczYjVV.webp"
                  alt="Happy Shiba Inu with a green drink"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
                <p className="text-xl text-center font-medium">doggo very happ because you are here</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-4">Play this lil game I made in Python</h2>
            <div className="flex flex-col items-center mb-6">
              <div className="flex flex-row justify-center space-x-4">
                <div className="flex flex-col items-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coding%20dog-WGXtTrTLrBEzzWZ3EmIDEKdoXd520X.webp"
                    alt="Dog wearing glasses and typing on a laptop"
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                  <p className="text-sm text-center font-medium mt-2">doggo program. he very smort</p>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gaming-n0eqtgM6pkrGW1ynRX1KFyEYGNpCdL.png"
                    alt="Dog wearing headphones and using a gaming setup"
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                  <p className="text-sm text-center font-medium mt-2">doggo also gamer</p>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-4">To run this game, you'll need Python and Pygame installed. Copy the code below and run it in your Python environment:</p>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {`import pygame
import time
import random

pygame.font.init()
score = 0
screenwidth = 750
screenheight = 300
playervel = 5
clock = pygame.time.Clock()
starttime = time.time()
elapsedtime = 0 
missilewidth = 10
missileheight = 20
missilevel = 3

screen = pygame.display.set_mode((screenwidth, screenheight))
pygame.display.set_caption("Dodge")

player = pygame.Rect(230,250,35,50)
missile_add_increment = 2000
missile_count = 0
missiles = []
hit = False

colorinput = input("SELECT YOUR COLOR. 1: RED, 2: BLUE, 3: GREEN, 4: PURPLE, 5: ORANGE, 6: TEAL, 7: PINK, 8: MAGENTA, 9: YELLOW, 10: NAVY, 11: WHITE, 12: BROWN, 13: SKY(CYAN), 14: LIME\\n")

colors = ["red", "blue", "green", "purple", "orange", "teal", "pink", "magenta", "cyan", "lime"]

if colorinput == "1":
  playercolor = "red"
elif colorinput == "2":
  playercolor = "blue"
elif colorinput == "3":
  playercolor = "green"
elif colorinput == "4":
  playercolor = "purple"
elif colorinput == "5":
  playercolor = "orange"
elif colorinput == "6":
  playercolor = "teal"
elif colorinput == "7":
  playercolor = "pink"
elif colorinput == "8":
  playercolor = "magenta"
elif colorinput == "9":
  playercolor = "yellow"
elif colorinput == "10":
  playercolor = "navy"
elif colorinput == "11":
  playercolor = "white"
elif colorinput == "12":
  playercolor = "brown"
elif colorinput == "13":
  playercolor = "cyan"
elif colorinput == "14":
  playercolor = "lime"
elif colorinput == "arapatapa":
  print("YOU HAVE TYPED THE SECRET CODE FOR BLIND MODE. YOUR COLOR IS BLACK.")
  playercolor = "black"
else:
  print("Ok...I guess I'll chose for you then...")
  playercolor = random.choice(colors)

def draw(missiles):
  for missile in missiles:
    pygame.draw.rect(screen, "white", missile)
  

while True:
  missile_count += clock.tick(60)
  screen.fill((0,0,0))
  elapsedtime = time.time() - starttime
  if missile_count > missile_add_increment:
    for _ in range(3):
      missilex = random.randint(0, screenwidth - missilewidth)
      missile = pygame.Rect(missilex, -missileheight, missilewidth, missileheight)
      missiles.append(missile)
    missile_count = 0
    missile_add_increment = max(200, missile_add_increment - 50)

  pygame.draw.rect(screen, playercolor, player)
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      run = False

  keys = pygame.key.get_pressed()
  if keys[pygame.K_LEFT] and player.x - playervel >= 0:
    player.x -= playervel
  elif keys[pygame.K_RIGHT] and player.x + playervel + 50 <= screenwidth:
    player.x += playervel

  for missile in missiles[:]:
    missile.y += missilevel
    if missile.y > screenheight:
      missiles.remove(missile)
      score = score + 1
    elif missile.y + missile.height >= player.y and missile.colliderect(player):
      missiles.remove(missile)
      hit = True
      print("GAME OVER! \\nYOUR SCORE: " + str(score))
      break
  if hit:
      break
  draw(missiles)
      

  pygame.display.update()    
pygame.quit()`}
              </pre>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold mr-4">Aaron's music</h2>
              <div className="flex flex-col items-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4337a4be75e9ae8cfc1af605dd4bdc00-S1swl2CXFHol7iDJ1eTpTEJDkWD9K4.gif"
                  alt="Dancing dog gif"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <p className="text-sm text-center font-medium mt-2">doggo party(he love doing the danc)</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ajr-G9jeT1QgENBEF9DVsSRAvHSh0yfTsN.jfif"
                  alt="AJR band members"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
                <p className="text-sm text-center font-medium mt-2">AJR</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/twenty%20one%20pilots-p9XjAtBRYZQycPV5IFjojoMyR2btSU.jfif"
                  alt="Twenty One Pilots band members"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
                <p className="text-sm text-center font-medium mt-2">twenty one pilots</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/x-gXIKafnWTQNfNGqAv51eRz4H04HIeI.jfif"
                  alt="XXXTentacion portrait"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
                <p className="text-sm text-center font-medium mt-2">XXXTENTACION(rip)</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boywithuke-CYz9yNk9SOHnbZJrMLfhtaaYwQN1ls.jfif"
                  alt="Boywithuke with ukulele"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
                <p className="text-sm text-center font-medium mt-2">BoyWithUke</p>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-iiChxElqxLLYhZWnEyZKETgznRHx49.jfif"
                alt="Fluffy white dog with watermelon collar"
                width={300}
                height={300}
                className="rounded-lg"
              />
              <p className="text-sm text-center font-medium mt-2">doggo is well-rounded</p>
            </div>
            <h3 className="text-xl font-bold mt-8 mb-4">About</h3>
            <p className="text-muted-foreground mb-4">
              If it wasn't clear already, this site is tiny and made by Aaron, an aspiring engineer. his dream school is MIT. if you are an MIT professor and was amazed by my immense coolness and want to accept me into MIT, please contact me!
            </p>
            <p className="text-muted-foreground mb-4">
              <Link href="https://b_ptcrr1ol0kb.v0.build/" className="text-primary hover:underline">
                This is another website made by me
              </Link>
            </p>
            <div className="flex flex-col items-center mt-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3n7z9b-bdLZueAzKMwiFbvxvVEPnPFyC6pGC7.jpg"
                alt="Sad looking Shiba Inu"
                width={300}
                height={300}
                className="rounded-lg"
              />
              <p className="text-sm text-center font-medium mt-2">doggo very sad because you have to go now</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 Aaron's Website. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}
