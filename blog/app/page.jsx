import Feed from "@components/Feed";

const HomePage = () => {
  return (
    <section>
        <h1 className="global_header"> Blog by AlexIoan </h1>
        <p className="mx-4 font-inter text-base text-dark-purple"> Share your greatest story with an amazing community. 
          More than that, create private stories and To Do lists.</p>
        <Feed /> 
    </section>
  )
}

export default HomePage; 