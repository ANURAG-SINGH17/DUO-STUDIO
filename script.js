function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco();

var tl = gsap.timeline({
    scrollTrigger:{
        trigger:"#page1 h2",
        scroller:"#main",
        start: "top 35%",
        end:"top 5%",
        scrub: 3,
    }
})

tl.to("#page1 h1" ,{
    x:-100,
},"anim") 

tl.to("#page1 h2" ,{
    x:100,
},"anim") 

tl.to("#page1 video",{
    width:"95%",
},"anim")


var tl2 = gsap.timeline()

tl2.to("#main",{
    duration: 1,
    backgroundColor:"white",
    scrollTrigger:{
        trigger:"#page2",
        scroller:"#main",
        start: "top 50%",
        end:"top 5%",
        scrub:1
    }
})


var tl3 = gsap.timeline({
    scrollTrigger:{
        trigger:"#page4",
        scroller:"#main",
        start: "top 50%",
        end:"top 5%",
        scrub:1,
    }
})

tl3.to('#main',{
  backgroundColor:'#0F0D0D',
})

var main = document.querySelector("#main");
var cur = document.querySelector("#cursur");

document.addEventListener("mousemove",function(dets){
  cur.style.left = dets.x + 20+"px"
  cur.style.top = dets.y + 20+"px"
})

var boxes = document.querySelectorAll("#page5-elm")
boxes.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        var att = elem.getAttribute("data-image")
        cur.style.width = "24vw"
        cur.style.height = "24vw"
        cur.style.borderRadius = "0"
        cur.style.backgroundImage = `url(${att})`
    })
    elem.addEventListener("mouseleave",function(){
        elem.style.backgroundColor = "transparent"
        cur.style.width = "20px"
        cur.style.height = "20px"
        cur.style.borderRadius = "50%"
        cur.style.backgroundImage = `none`
    })
})
