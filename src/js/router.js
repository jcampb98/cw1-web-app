class Router { 
    constructor() { 
      this.routes = {}; 
      this.defaultRoute = ""; 
      window.addEventListener("popstate", this.onpopstate); 
    } 
   
    // register a new route 
    addRoute = (route, template) => { 
      this.routes[route] = template; 
    }; 
   
    // resolve current route from url 
    resolveRoute = () => { 
      const currentRoute = window.location.pathname; 
      this.goTo(currentRoute === "/" ? this.defaultRoute : currentRoute); 
    }; 
   
    // go to a specific route. 
    goTo = (route) => { 
      const content = this.routes[route]; 
   
      if (!content) { 
        // Fallback to default route if route not found. 
        this.goTo(this.defaultRoute); 
        return; 
      }

      this.renderContent(content, route); 
      window.history.pushState({ content, title: route }, '', route); 
    }; 
   
    // set default route. 
    setDefault = (route) => { 
      this.defaultRoute = route; 
    }; 
   
    // handle history change event 
    onpopstate = (e) => { 
      if (e.state) { 
        this.renderContent(e.state.content, e.state.title); 
      } 
    }; 
   
    // render view in content placeholder 
    renderContent = (content, title) => { 
      let templateDiv = document.getElementById("content"); 
      templateDiv.innerHTML = content; 
      document.title = title; 
    }; 
  } 
 
  export default Router;