/* VARIABLES GLOBALES */

    // Coordonnées de la souris

    let clientX = 0;
	let clientY = 0;


    // Mon Curseur

		const innerCursor = document.querySelector(".cursor--small");


    // Groupe de polygone que l'on crée pour avoir du mouvement
        
        let group; 


    // Coordinate of the center's item we will stuck on
        
        let stuckX, stuckY;



    let lastX = 0;
    let lastY = 0;
    let isStuck = false;
    let showCursor = false;


    let fillOuterCursor;



/* FUNCTIONS */

    //Capte les mouvements de souris et retranscrit les coordonnées dans notre innerCursor

        function initCursor()
        {
            // add listener to track the current mouse position
                document.addEventListener("mousemove", e => 
                {
                    clientX = e.clientX;
                    clientY = e.clientY;
                });

            requestAnimationFrame(render);
        };


    // Change la position de innerCursor sur la position de la souris 

        function render() 
        {
            innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
            requestAnimationFrame(render);
        }


    // Function for linear interpolation of values

        function lerp(a, b, n)
        {
            return ((1 - n) * a + n * b);
        }

    // function to map a value from one range to another range

        function map(value, in_min, in_max, out_min, out_max)
        {
            let quoi = ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
            return quoi;
        };



    function initCanvas()
    {


        // Sélectionne le cercle du curseur

            const canvas = document.querySelector(".cursor--canvas");

        // Créer le projet
        
            paper.setup(canvas); 


        // Polygon parameters avant init

            // Forme
              const strokeColor = "rgba(255, 0, 0, 0.5)"; // Couleur du trait
              const strokeWidth = 1; // Epaisseur du trait
              const segments = 8; // Nombre de coté de la forme
              const radius = 15; // Rayon du polygone
          
            // For noisy circle
              const noiseScale = 100; // lenteur
              const noiseRange = 10; // range of distortion
              let isNoisy = false; // state
          

        // Init de la forme de base

            const polygon = new paper.Path.RegularPolygon(
                new paper.Point(0, 0),  // Point
                segments,               // Nb de coté
                radius                  // Rayon
            );

            polygon.strokeColor = strokeColor;
            polygon.strokeWidth = strokeWidth;
            polygon.smooth(); // Arrondi les traits et les angles


        // Limite de la taille du canvas quand il est agrandi au survol d'une class

            const shapeBounds = 
            {
                width: 100,
                height: 100
            };


        // Créer un groupe pour appliquer les transformations à tous les membres  
          
            group = new paper.Group([polygon]);
            group.applyMatrix = false;

    
        // Rien compris

            // Permet de faire le lien d'échelle entre une valeur d'input et un output
                const noiseObjects = polygon.segments.map(() => new SimplexNoise());

            // ??
                let bigCoordinates = [];
  


        // Function called at each frame
        paper.view.onFrame = event => {


            // Donne les coordonnées du canvas si stuck ou non

                if (!isStuck) 
                {

                    // Accélere ou non la traine du cercle canvas après le cursor

                        let rateStrint = 0.2; 
                            /*  0 : slowmotion 
                                1: imediate movement 
                            */

                        lastX = lerp(lastX, clientX, rateStrint);
                        lastY = lerp(lastY, clientY, rateStrint);


                    // Actualise le centre de notre forme (ce qui la fait avancer)

                        group.position = new paper.Point(lastX, lastY);

                } 

                else if (isStuck) 
                {

                // fixed position on a nav item

                    lastX = lerp(lastX, stuckX, 0.2);
                    lastY = lerp(lastY, stuckY, 0.2);
                    group.position = new paper.Point(lastX, lastY);
                }
          

        // Agrandi le canvas tant qu'il n'est pas à shapeBounds.width (à paramètrer)

            if (isStuck && polygon.bounds.width < shapeBounds.width) 
            { 
                // scale up the shape 
                    polygon.scale(1.08);
            } 


        // Diminue le canvas jusqu'à sa taille limite

            else if (!isStuck && polygon.bounds.width > 40) // Borne le radius max normal à cette valeur (fera diminuer radius défini plus haut si sup)
            {

                // Remove noise

                if (isNoisy) 
                {
                    polygon.segments.forEach((segment, i) => 
                    {
                        segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
                    });

                    isNoisy = false;
                    bigCoordinates = [];
                }

                // Scale down the shape

                const scaleDown = 0.92;

                polygon.scale(scaleDown);
            }
          

        // While stuck and big, apply simplex noise
        
            if (isStuck && polygon.bounds.width >= shapeBounds.width) 
              {

                isNoisy = true;


                // first get coordinates of large circle

                    if (bigCoordinates.length === 0) 
                    {
                        polygon.segments.forEach((segment, i) => {
                            bigCoordinates[i] = [segment.point.x, segment.point.y];
                        });
                    }
                

                // loop over all points of the polygon

                    polygon.segments.forEach((segment, i) => {
                      
                      // get new noise value
                      // we divide event.count by noiseScale to get a very smooth value
                      const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
                      const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);
                      
                      // map the noise value to our defined range
                      const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
                      const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);
                      
                      // apply distortion to coordinates
                      const newX = bigCoordinates[i][0] + distortionX;
                      const newY = bigCoordinates[i][1] + distortionY;
                      
                      // set new (noisy) coodrindate of point
                      segment.point.set(newX, newY);
                    });
                
              }
              polygon.smooth();
            };
              }



        // Indique a isStuck is true si l'on passe sur un lien et false si l'on en part

        function initHovers() 
        {

            // FUNCTION Trouve les coordonnées du centre de l'élement ciblé et renvoie IsStuck = true

                const handleMouseEnter = e => 
                {
                    const navItem = e.currentTarget;
                    const navItemBox = navItem.getBoundingClientRect();

                    stuckX = Math.round(navItemBox.left + navItemBox.width / 2-6);
                    stuckY = Math.round(navItemBox.top + navItemBox.height / 2-6);

                    isStuck = true;
                };
          
            
            // FUNCTION reset isStuck on mouseLeave

                const handleMouseLeave = () => 
                {
                    isStuck = false;
                };
          

            // CONSTANTE add event listeners to all items

                const linkItems = document.querySelectorAll(".link");

                linkItems.forEach(item => {
                    item.addEventListener("mouseenter", handleMouseEnter);
                    item.addEventListener("mouseleave", handleMouseLeave);
                });
       };



/* INITIALISATION */


    // Initialise la captation des mouvements de souris
    initCursor();

    // Initialise la création du cercle du cursor
     initCanvas();

    // Indique lorsque hover sur un lien
    initHovers();




