"use client"

import React from "react"
import { motion, useScroll, useTransform } from "framer-motion" // ✅ Correct import

const Blogs = () => {
  return (
    <div className="w-full flex justify-center px-4">
      <ScrollLinked />
    </div>
  )
}

export default Blogs

function ScrollLinked() {
  const { scrollYProgress } = useScroll()
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 5])

  return (
    <>
      {/* Scroll Indicator */}
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#ff0088",
        }}
      />
      <motion.div
        id="scroll-indicator"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          x: "-50%", // ✅ Center horizontally
          y: "-50%", // ✅ Center vertically
          width: "200px",
          height: "200px",
          borderRadius: "999px",
          backgroundColor: "#ff0088",
          zIndex: -50,
          opacity: 0.3,
          scale, // ✅ Uses scrollYProgress
        }}
      />
      <Content />
    </>
  )
}

function Content() {
  return (
    <article className="max-w-[500px] mx-auto px-5 py-[150px] flex flex-col gap-5">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
        rhoncus quam.
      </p>
      <p>
        Fringilla quam urna. Cras turpis elit, euismod eget ligula quis,
        imperdiet sagittis justo. In viverra fermentum ex ac vestibulum.
        Aliquam eleifend nunc a luctus porta. Mauris laoreet augue ut felis
        blandit, at iaculis odio ultrices. Nulla facilisi. Vestibulum cursus
        ipsum tellus, eu tincidunt neque tincidunt a.
      </p>
      <h2>Sub-header</h2>
      <p>
        In eget sodales arcu, consectetur efficitur metus. Duis efficitur
        tincidunt odio, sit amet laoreet massa fringilla eu.
      </p>
      <p>
        Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
        Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
        Proin sit amet lacus mollis, semper massa ut, rutrum mi.
      </p>
      <p>
        Sed sem nisi, luctus consequat ligula in, congue sodales nisl.
      </p>
      <p>
        Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
        leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
      </p>
      <h2>Sub-header</h2>
      <p>
        Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
        aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
        sem, sit amet tempor nulla. Quisque fermentum felis faucibus, vehicula
        metus ac, interdum nibh. Curabitur vitae convallis ligula. Integer ac
        enim vel felis pharetra laoreet. Interdum et malesuada fames ac ante
        ipsum primis in faucibus. Pellentesque hendrerit ac augue quis pretium.
      </p>
      <p>
        Morbi ut scelerisque nibh. Integer auctor, massa non dictum tristique,
        elit metus efficitur elit, ac pretium sapien nisl nec ante. In et ex
        ultricies, mollis mi in, euismod dolor.
      </p>
      <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
      {/* Add more content blocks as needed */}
    </article>
  )
}
