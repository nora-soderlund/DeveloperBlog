import ProgrammerNetworkIcon from "./ProgrammerNetworkIcon";

export default function ProgrammerNetworkLink({ href = "https://programmer.network", text = "Programmer Network" }) {
    return (
        <a href={href} target="_blank" rel="noreferrer" className="programmer-network">
            <ProgrammerNetworkIcon/> {text}
        </a>
    )
};
