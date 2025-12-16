import TextType from "./TextType";
import Galaxy from "./ui/galaxy";



export default function NochatSelected() {
  return (
    <div className="w-full h-full relative">
      <Galaxy
            mouseRepulsion={false}
            mouseInteraction={true}
            density={1}
            glowIntensity={0.1}
            saturation={0}
            hueShift={500}
            starSpeed={0.2}
            transparent = {true}
          />
      <div>
      <div className="space-y-4 absolute flex-col flex justify-center items-center top-1/3 left-1/3">
        <TextType className="text-4xl font-bold"  text={["Welcome back!", "Ready to connect?", "Happy coding!"]}
          typingSpeed={100}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"/>
      <p>Select a chat to start a conversation</p> 
      </div>
      </div>
    </div>
  )
}
