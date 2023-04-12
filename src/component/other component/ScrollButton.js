import { useState } from "react";
import { Button } from "./Styles";
import { FaArrowCircleUp } from 'react-icons/fa';

export default function ScrollButton() {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        // const scrolled = document.body.scrollIntoView({ behavior: "smooth", block: "start" });
        const scrolled = document.createElement.scrollTop;
        if (scrolled > 300) {
            console.log("test");
            setVisible(true);
        }
        else if (scrolled <= 300) {
            setVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button>
            <FaArrowCircleUp onClick={scrollToTop} style={{ display: visible ? 'inline' : 'none' }} />
        </Button>
    )
}