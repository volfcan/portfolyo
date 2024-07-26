"use client";
import { workExperience } from "../constants/workExperience";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import Image from "next/image";
import Beam from "./Beam/Beam";
import moment from "moment";

export const Experience = () => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeWorkExperience, setActiveWorkExperience] = useState(
    workExperience[0],
  );
  return (
    <div className="max-w-5xl mx-auto px-8">
      <h1 className="text-white tracking-tight text-2xl md:text-3xl font-bold max-w-5xl mx-auto mt-20 md:mt-20">
        Work Experience
      </h1>
      <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-4 leading-loose tracking-tight">
        My previous work experiences
      </p>
      <div className="flex flex-row md:flex-col relative overflow-x-auto md:overflow-x-visible">
        <div className="flex flex-row md:flex-col relative overflow-x-auto md:overflow-x-visible">
          <div className="absolute bg-zinc-800 -left-6 w-px h-full bg-zinc-800 overflow-hidden">
            <Beam showBeam={true} className={`-left-0`} />
          </div>
          {workExperience.map((exp, idx) => (
            <div
              key={`exp-${idx}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative my-2"
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full  w-full bg-zinc-800 rounded-md"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => setActiveWorkExperience(exp)}
                className={clsx(
                  "text-zinc-400 px-4 py-2 relative z-20 min-w-28 w-full text-left rounded-md flex flex-row space-x-2 items-center group",
                  activeWorkExperience?.company === exp.company
                    ? "bg-zinc-800"
                    : null,
                )}
              >
                <div className="bg-red-500 p-1 h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800">
                  <Image
                    src={exp.logo}
                    width={12}
                    height={12}
                    alt={exp.company}
                    className="flex-shrink-0 transition duration-200"
                  />
                </div>
                <span>{exp.company}</span>
              </button>
            </div>
          ))}
        </div>
        <div className="md:pl-10 flex-1">
          <div className="flex flex-col space-y-4">
            <AnimatePresence>
              <motion.div
                className="flex flex-col space-y-2"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15 },
                }}
                layoutId={activeWorkExperience?.company}
              >
                <h1 className="text-2xl font-bold text-zinc-100">
                  {activeWorkExperience?.role}
                  {""}
                  <span className="text-cyan-500">
                    @ {activeWorkExperience?.company}
                  </span>
                </h1>
                <div className="text-zinc-400 text-sm tracking-widest">
                  {moment(activeWorkExperience?.startDate).format("MMM YYYY")} -
                  {""}
                  {moment(activeWorkExperience?.endDate).format("MMM YYYY")}
                </div>
                <p className="text-zinc-400 text-sm">
                  {activeWorkExperience?.location}
                </p>
                <div>
                  {activeWorkExperience?.description.map((bullet, idx) => (
                    <div
                      key={`bullet-${idx}`}
                      className="flex flex-row space-x-2 items-start my-2"
                    >
                      <BsCheck2 className="text-cyan-500 mt-[3px] flex-shrink-0" />
                      <span className="text-sm text-zinc-400">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
