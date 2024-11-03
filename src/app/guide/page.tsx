"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Check, Download, File, Menu, X } from "lucide-react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import Image from "next/image";
import { Tree } from "@/components/Tree";

export default function Component() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          window.pageYOffset >= sectionTop - 50 &&
          window.pageYOffset < sectionTop + sectionHeight - 50
        ) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    "Introduction",
    "Get your OP Bento",
    "After you have generated your Bento",
    "Finale",
  ];

  return (
    <>
      <div className="min-h-[40rem] mt-4 w-full pt-16 rounded-md flex justify-center flex-col antialiased relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#fc32327e"
        />
        <div className="max-w-7xl px-4 sm:px-24 relative">
          <header className="py-8 flex justify-between items-center">
            <h1 className="text-2xl sm:text-[2.5rem] font-bold tracking-tight">
              OP Bento Docs
            </h1>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          </header>

          <p className="text-base sm:text-[1.1rem] text-foreground/80 mb-8">
            Welcome to the official documentation for{" "}
            <span className="bg-zinc-800/50 px-2 py-0.5 rounded text-[0.9rem] font-medium">
              OP Bento
            </span>
            .
          </p>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative">
            {/* Main Content */}
            <main className="flex-1 pb-20">
              <section id="introduction" className="mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-[2rem] font-bold mb-6"
                ></motion.h2>
                <p className="text-foreground/80 text-base sm:text-[1.1rem] leading-relaxed mb-8">
                  Hey there, GitHub superstar! Ready to give your profile some
                  serious swagger? With OP Bento, you'll turn your profile into
                  a dynamic, eye-catching showcase that updates automatically
                  with your latest GitHub stats. Think of it as a mini homepage
                  that shows the world what you’re working on, without you
                  lifting a finger (after setup, of course)!
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Customizable Bento Grid",
                    "Automatic Updates",
                    "Easy Setup Files",
                    "1-click download",
                    "More features coming soon!",
                  ].map((text, index) => (
                    <motion.li
                      key={text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-2.5 text-base sm:text-[1.1rem] text-foreground/80"
                    >
                      <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                      {text}
                    </motion.li>
                  ))}
                </ul>
              </section>

              <section id="get-your-op-bento">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-[2rem] font-bold mb-8"
                >
                  Get Your OP Bento!
                </motion.h2>
                <p className="text-foreground/80 text-base sm:text-[1.1rem] leading-relaxed">
                  Fill out the bio section with the information you want
                  displayed.
                </p>
                <img
                  src="/guide1.png"
                  alt="OP Bento"
                  className="mt-8 w-full rounded-2xl"
                />
                <div className="flex items-center gap-4 text-foreground/80 mt-8 text-base sm:text-[1.1rem] leading-relaxed">
                  Click on the{" "}
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ">
                    Generate Bento{" "}
                  </button>
                  button. And Voila !! This will generate a new Bento for you.
                </div>
              </section>

              <section
                id="after-you-have-generated-your-bento"
                className="mt-16"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-[2rem] font-bold mb-8"
                >
                  After you have generated your Bento
                </motion.h2>
                <div className="text-foreground/80 text-base sm:text-[1.1rem] leading-relaxed">
                  <p>
                    Once you have generated your Bento, you will be able to see
                    a embed link for your Bento. You can use this link to embed
                    your Bento on your GitHub README.md. Along with it you will
                    also get two files are below. These are the files that you
                    will need to setup your Bento.
                  </p>

                  <div className="flex mt-5 gap-5">
                    <button className="flex bg-secondary/50 items-center space-x-3 px-4 text-left p-2 rounded-full">
                      <Image
                        width={100}
                        height={100}
                        src="/typescript.svg"
                        alt="typescript"
                        className="w-5 h-5"
                      />
                      <span>getNewBento.ts</span>
                      <Download className="w-6 h-6 text-green-500" />
                    </button>

                    <button className="flex bg-secondary/50 items-center space-x-3 px-4 text-left p-2 rounded-full">
                      <File className="w-5 h-5 text-red-500" />
                      <span>update-bento.yml</span>
                      <Download className="w-6 h-6 text-green-500" />
                    </button>
                  </div>

                  {/* Note */}
                  <div className="bg-zinc-800/50 p-4 rounded mt-8">
                    <p className="text-foreground/80 text-base sm:text-[1.1rem] leading-relaxed">
                      <strong className="text-red-500">Note:</strong> Do not
                      change the name of the files. If you do, the setup will
                      not work.
                    </p>
                  </div>
                </div>

                <p className="mt-5">
                  Atlast, add up the link in your README.md file and make a
                  folder named
                  <strong> .github/workflows </strong> and add the{" "}
                  <strong> action.yml </strong>
                  file in it. And in the main directory add the getbento.ts
                  file. So that the setup will be look like below.
                </p>

                <div className="w-72 mt-5 rounded-xl cursor-pointer bg-neutral-400/10 p-4">
                  <Tree contentTree="Your Repo">
                    <Tree contentTree="README.md" />
                    <Tree contentTree="getbento.ts" />
                    <Tree contentTree=".github" defaultCollapsed={false}>
                      <Tree contentTree="workflows">
                        <Tree contentTree="action.yml" />
                      </Tree>
                    </Tree>
                  </Tree>
                </div>
              </section>

              <section id="finale" className="mt-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-[2rem] font-bold mb-8"
                >
                  And That’s It! 🎉
                </motion.h2>
                <p className="text-foreground/80 text-base sm:text-[1.1rem] leading-relaxed">
                  Congrats on setting up your OP Bento! Your GitHub profile now
                  has a unique, eye-catching grid that showcases your projects,
                  updates with your latest activity, and is ready to impress
                  anyone who visits. Now go forth and share it with the world!
                  🌍.
                </p>

                {/* Ask for stars and likes */}
                <div className="mt-8 bg-zinc-800/50 p-4 rounded">
                  <p className="text-foreground/80 text-base sm:text-[1.1rem] leading-relaxed">
                    If you found this guide helpful, please consider giving it a
                    star on GitHub. It helps others find it and encourages me to
                    create more content like this. Thank you! 🙏
                  </p>
                </div>
              </section>
            </main>

            {/* Right Navigation */}
            <nav
              className={`w-72 xl:w-64 fixed xl:fixes top-0 right-0 h-full xl:h-screen bg-black xl:bg-transparent z-50 overflow-auto xl:overflow-visible transition-transform duration-300 ease-in-out ${
                isMenuOpen
                  ? "translate-x-0"
                  : "translate-x-full xl:translate-x-0"
              }`}
            >
              <div className="p-6 lg:p-0 lg:pt-8">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="xl:hidden absolute top-4 right-4"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 2L3 14h10L8 2Z"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                  On this page
                </div>
                <div className="relative">
                  <motion.div
                    className="absolute left-0 w-[2px] bg-primary origin-top rounded"
                    style={{ scaleY }}
                  />
                  <ul className="space-y-3 border-l border-zinc-800">
                    {navItems.map((item) => (
                      <li key={item}>
                        <Link
                          href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className={`block pl-4 text-[0.9rem] transition-colors ${
                            activeSection ===
                            item.toLowerCase().replace(/\s+/g, "-")
                              ? "text-white font-medium"
                              : "text-gray-400 hover:text-white"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
