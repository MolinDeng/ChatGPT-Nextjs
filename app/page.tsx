import { SunIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <main>
      <div className=" flex flex-col items-center justify-center h-screen">
        <h1 className=" text-5xl font-bold mb-20">ChatGPT</h1>

        <div className="flex space-x-2 text-center">
          <div>
            <div className=" flex flex-col items-center justify-center mb-5">
              <SunIcon className="h-8 w-8" />

              <h2>Exapmles</h2>
            </div>
            <div className=" space-y-2">
              <p className="info-text">"Explain Something to me"</p>
              <p className="info-text">
                "What is the difference between a dog and a cat?"
              </p>
              <p className="info-text">"What is the color of the sun?"</p>
            </div>
          </div>

          <div>
            <div className=" flex flex-col items-center justify-center mb-5">
              <BoltIcon className="h-8 w-8" />

              <h2>Capabilities</h2>
            </div>
            <div className=" space-y-2">
              <p className="info-text">Change the ChatGPT Model to use</p>
              <p className="info-text">Messages are stored in Firestore</p>
              <p className="info-text">
                Hot Toasts notifications when ChatGPT is thinking!
              </p>
            </div>
          </div>

          <div>
            <div className=" flex flex-col items-center justify-center mb-5">
              <ExclamationTriangleIcon className="h-8 w-8" />

              <h2>Limitations</h2>
            </div>
            <div className=" space-y-2">
              <p className="info-text">
                May occasinally generate incorrect information
              </p>
              <p className="info-text">
                May occasionally produce harmful instructions or biased content
              </p>
              <p className="info-text">
                Limited knowledge of world and events after 2021
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
