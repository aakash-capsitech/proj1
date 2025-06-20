"use client"

import * as motion from "motion/react-client"
import { useState } from "react"
import ServicesComponent from "../components/Services"

const Services = () => {
  return (
    <div>
        <ServicesComponent />
        {/* <div className="flex justify-center items-center">
            <DemoAnimation />
            <DemoAnimation />
            <DemoAnimation />
            <DemoAnimation />
        </div>
        <div className="mx-auto">
            <DemoAnimation2 />
            <DemoAnimation2 />
            <DemoAnimation2 />
            <DemoAnimation2 />
        </div> */}
    </div>
  )
}

const DemoAnimation =() =>{
    return (
        <div>
            <LayoutAnimation />
            <LayoutAnimation />
            <LayoutAnimation />
            <LayoutAnimation />
            <LayoutAnimation />
            <LayoutAnimation />
            <LayoutAnimation />
            <LayoutAnimation />
        </div>
    )
}

const DemoAnimation2 =() =>{
    return (
        <div className="flex justify-center items-center">
            <LayoutAnimation />
            <LayoutAnimation />
            <LayoutAnimation />
            <LayoutAnimation />
            <LayoutAnimation />
            <LayoutAnimation />
            <LayoutAnimation />
            <LayoutAnimation />
        </div>
    )
}

export default Services

function LayoutAnimation() {
    const [isOn, setIsOn] = useState(false)

    const toggleSwitch = () => setIsOn(!isOn)

    return (
        <button
            className="toggle-container"
            style={{
                ...container,
                justifyContent: "flex-" + (isOn ? "start" : "end"),
            }}
            onClick={toggleSwitch}
        >
            <motion.div
                className="toggle-handle"
                style={handle}
                layout
                transition={{
                    type: "spring",
                    visualDuration: 0.3,
                    bounce: 2,
                }}
            />
        </button>
    )
}

/**
 * ==============   Styles   ================
 */

const container = {
    width: 100,
    height: 50,
    backgroundColor: "var(--hue-3-transparent)",
    borderRadius: 50,
    cursor: "pointer",
    display: "flex",
    padding: 10,
}

const handle = {
    width: 50,
    height: 50,
    backgroundColor: "#9911ff",
    borderRadius: "50%",
}
