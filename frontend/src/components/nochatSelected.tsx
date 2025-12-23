import TextType from "./TextType";
export default function NochatSelected() {
  return (
    <div className="w-full h-full relative">
      <div className="space-y-4 absolute flex-col flex justify-center items-center top-1/3 left-1/3">
        <TextType className="text-4xl font-bold"  text={["Welcome back!", "Ready to connect?", "Happy coding!"]}
          typingSpeed={100}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"/>
      <p>Select a chat to start a conversation</p> 
      </div>
    </div>
  )
}
