import { useContext } from "react"


export default function AppContext({ DrawerContext }) {
    const { color } = useContext(DrawerContext);
    console.log({ color });

    return (
        <div>

        </div>
    )
}