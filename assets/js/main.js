let Engine = Matter.Engine,
 Render = Matter.Render,
 Runner = Matter.Runner,
 Bodies = Matter.Bodies,
 Composite = Matter.Composite,
 Composites = Matter.Composites,
 Constraint = Matter.Constraint,
 Mouse = Matter.Mouse,
 MouseConstraint = Matter.MouseConstraint,
 Events = Matter.Events;

 let engine;
let render;
let runner;

function init() {
    // create an engine
    engine = Engine.create();
   
    // create a renderer
    render = Render.create({
    element: document.getElementById("areaToRender"),
    engine: engine,
    options: {
    width: 2000,
    height: 900,
    pixelRatio: 1,
    background: '#fafafa',
    wireframes: false // <-- important
    }
    });
   
    // run the renderer
    Render.run(render);
   
    // create runner
    runner = Runner.create();
   
    // run the engine
    Runner.run(runner, engine);
   }

   let lastClear = "(not given)"
   function clearWorld(exampleName) {
    if (lastClear != exampleName) {
    lastClear = exampleName
   
    Matter.Composite.clear(engine.world, false)
    }
   }

function StartSlingshot() {

    clearWorld("Slingshot")
   
    // add bodies
    let ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true });
    let rockOptions = { density: 0.004 };
    let rock = Bodies.polygon(170, 450, 8, 20, rockOptions);
    let anchor = { x: 170, y: 450 };
    let elastic = Constraint.create({
    pointA: anchor,
    bodyB: rock,
    stiffness: 0.05,
    render: { strokeStyle: 'gray', lineWidth: 2 }
    });
    let ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true });
   
    let pyramid = Composites.pyramid(550, 0, 5, 10, 0, 0, function (x, y) {
    return Bodies.rectangle(x, y, 25, 40);
    });

    // add mouse control
 let mouse = Mouse.create(render.canvas),
 mouseConstraint = MouseConstraint.create(engine, {
 mouse: mouse,
 constraint: {
 stiffness: 0.2,
 render: {
 visible: false
 }
 }
 });

 Events.on(engine, 'afterUpdate', function () {
    if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
    rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
    Composite.add(engine.world, rock);
    elastic.bodyB = rock;
    }
    });

    Composite.add(engine.world, [ground, ground2, pyramid, rock, elastic]);
    Composite.add(engine.world, mouseConstraint);
   
    // keep the mouse in sync with rendering
    render.mouse = mouse;
   }