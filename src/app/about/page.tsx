import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Earth } from "lucide-react";
import Link from "next/link";

export default function CreatorsPage() {
  return (
    <>
      <Link
        href={"/"}
        className="flex md:top-4 md:left-8 top-2 left-2 shadow lg:top-10 lg:left-20 bg-background/10 backdrop-blur-md p-2 rounded-xl items-center gap-4 fixed"
      >
        <img
          className="size-8 lg:size-12"
          src="/logo.png"
          alt=""
          width={30}
          height={30}
        />
        <p className="text-lg font-black md:text-xl lg:text-2xl">OP Bento</p>
      </Link>
      <div className="flex max-w-5xl min-h-svh mx-auto gap-4 py-20 flex-col">
        <div className="absolute h-32 w-80 bg-primary/20 blur-3xl -top-10 left-1/2 -translate-x-1/2"></div>
        <h2 className="text-4xl md:text-6xl text-center cursor-crosshair font-bold">
          <span className="text-primary">C</span>reators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 sm:px-0 mt-10 md:gap-8">
          <article className="overflow-hidden bg-card border hover:border-primary/25 group rounded-lg shadow transition-all duration-500 hover:shadow-lg hover:shadow-primary/10">
            <Image
              alt="anish"
              width={500}
              height={400}
              src="https://i.postimg.cc/JhqfsYJH/Anish-pic-2.jpg"
              className="h-[360px] w-full group-hover:scale-105 transition-all duration-500 object-cover object-top"
            />

            <div className="p-4 sm:p-6">
              <h3 className="mt-0.5 text-lg font-semibold">Anish Biswas</h3>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-muted-foreground">
                Loves football, Music production and making the darkest jokes.
                He&apos;s him. Literally.
              </p>
              <div className="flex flex-wrap pt-10 pb-2 gap-4">
                <Button
                  asChild
                  className="bg-lime-500 text-black hover:bg-lime-400"
                >
                  <a target="__blank" href={"https://dub.sh/anish"}>
                    Website{" "}
                    <span>
                      <Earth className="ml-2 size-5" />
                    </span>
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-zinc-800 text-white hover:bg-slate-700"
                >
                  <a target="__blank" href={"https://git.new/anish"}>
                    Github{" "}
                    <span>
                      <Github className="ml-2 size-5" />
                    </span>
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-blue-600 text-white hover:bg-blue-500"
                >
                  <a target="__blank" href={"https://dub.sh/anish-li"}>
                    Linkedin{" "}
                    <span>
                      <Linkedin className="ml-2 size-5" />
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </article>
          <article className="overflow-hidden bg-card border hover:border-primary/25 group rounded-lg shadow transition-all duration-500 hover:shadow-lg hover:shadow-primary/10">
            <Image
              alt="subha"
              width={500}
              height={400}
              src="https://real-devs.netlify.app/img/subha.webp"
              className="h-[360px] w-full group-hover:scale-105 transition-all duration-500 object-cover object-top"
            />

            <div className="p-4 sm:p-6">
              <h3 className="mt-0.5 text-lg font-semibold">Subhadeep Roy</h3>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-muted-foreground">
                Highly frank ,fueled with enthusiasm and a connoisseur of
                greatness. Loves anime and playing chess.
              </p>
              <div className="flex flex-wrap pt-10 pb-2 gap-4">
                <Button
                  asChild
                  className="bg-lime-500 text-black hover:bg-lime-400"
                >
                  <a target="__blank" href={"https://mvp-subha.me"}>
                    Website{" "}
                    <span>
                      <Earth className="ml-2 size-5" />
                    </span>
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-zinc-800 text-white hover:bg-slate-700"
                >
                  <a target="__blank" href={"https://git.new/subha"}>
                    Github{" "}
                    <span>
                      <Github className="ml-2 size-5" />
                    </span>
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-blue-600 text-white hover:bg-blue-500"
                >
                  <a
                    target="__blank"
                    href={"https://www.linkedin.com/in/subhadeep3902/"}
                  >
                    Linkedin{" "}
                    <span>
                      <Linkedin className="ml-2 size-5" />
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </article>
          <article className="overflow-hidden bg-card border hover:border-primary/25 group rounded-lg shadow transition-all duration-500 hover:shadow-lg hover:shadow-primary/10">
            <Image
              alt="subha"
              width={500}
              height={400}
              src="https://i.postimg.cc/FH6q8M8r/71373838.jpg"
              className="h-[360px] w-full group-hover:scale-105 transition-all duration-500 object-cover object-top"
            />

            <div className="p-4 sm:p-6">
              <h3 className="mt-0.5 text-lg font-semibold">Arghya Ghosh</h3>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-muted-foreground">
                Likes to design and build software that makes people more badass
                at what they do.|
              </p>
              <div className="flex flex-wrap pt-10 pb-2 gap-4">
                <Button
                  asChild
                  className="bg-lime-500 text-black hover:bg-lime-400"
                >
                  <a target="_blank" href="https://dub.sh/arghya">
                    Website
                    <span>
                      <Earth className="ml-2 size-5" />
                    </span>
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-zinc-800 text-white hover:bg-slate-700"
                >
                  <a target="_blank" href="https://git.new/arghya">
                    Github
                    <span>
                      <Github className="ml-2 size-5" />
                    </span>
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-blue-600 text-white hover:bg-blue-500"
                >
                  <a target="_blank" href="https://dub.sh/arghya-li">
                    Linkedin
                    <span>
                      <Linkedin className="ml-2 size-5" />
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
