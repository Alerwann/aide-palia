import Navigation from './nav';


export default function HeaderCreate() {

    return (
      
        <header className="p-5 gap-5 flex flex-col content-center justify-center bg-blue-300">
          <h1 className="text-center text-amber-300  text-3xl  ">
            Tout ce qu'il faut savoir sur
            <strong className="text-6xl font-[tangerine]"> Palia</strong>
          </h1>
          <Navigation />
        </header>
  
    );    
}
