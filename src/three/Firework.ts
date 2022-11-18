import { BufferAttribute, GeometryUtils, Scene, Vector3 } from "three";
import { Ref } from "vue";
import * as THREE from 'three'

export default class Firework {

    public scene: Scene
    public done: boolean = false
    public dest: Array<THREE.Vector3> = []
    public colors: Array<THREE.Color> = []
    public geometry: THREE.BufferGeometry
    public points: THREE.Points
    public material: THREE.Material

    constructor(scene: Scene) {
        this.scene = scene
        const width = 800;
        const height= 400;
        const MAX_POINTS = 100;
        let x = THREE.MathUtils.randInt( -width, width ); 
        let y = THREE.MathUtils.randInt( 100, 800 );
        let z = THREE.MathUtils.randInt( -1000, -3000 ); 
        // Start coordinate 
        let from = new THREE.Vector3( x, -800, z ); 
        // Explode coordinate
        let to   = new THREE.Vector3( x, y, z ); 
        
        let color = new THREE.Color()
        
        color.setHSL( THREE.MathUtils.randFloat(0.1, 0.9), 1, 0.9)
        this.colors.push(color)
        this.geometry = new THREE.BufferGeometry()

        const positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
        positions[0] = from.x
        positions[1] = from.y
        positions[2] = from.z
        this.geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ));

        const colors = new Float32Array( MAX_POINTS * 3 ); // r,g,b per colors
        colors[0] = color.r
        colors[1] = color.g
        colors[2] = color.b
        this.geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ));

        this.material = new THREE.PointsMaterial({
            size: 40   ,
            color: 0xffffff,
            opacity: 1,
            vertexColors: true,
            transparent: true,
            depthTest: false,
        });

        this.points = new THREE.Points(this.geometry, this.material)
                
        this.dest.push( to ); 
        this.colors.push( color ); 
        this.scene.add(this.points)
    }

    public update() {
        if( this.points && this.geometry )
        {            
            if (this.geometry === null) return
            let count = 0 
            for(let i=0; i < this.geometry.getAttribute('position').count; i++){
                let x = this.geometry.getAttribute('position').getX(i)
                let y = this.geometry.getAttribute('position').getY(i)
                let z = this.geometry.getAttribute('position').getZ(i)

                if (x === 0 && y === 0 && z === 0) break
                count++
                this.geometry.getAttribute('position')
                    .setX(i, x + (this.dest[i].x - x) / 50 )

                this.geometry.getAttribute('position')
                    .setY(i, y + (this.dest[i].y - y) / 50 )

                this.geometry.getAttribute('position')
                    .setZ(i, z + (this.dest[i].z - z) / 50 )
                
                this.geometry.getAttribute('position').needsUpdate = true
            }

            if (count == 1) {
                let x = this.geometry.getAttribute('position').getX(0)
                let y = this.geometry.getAttribute('position').getY(0)
                let z = this.geometry.getAttribute('position').getZ(0)
                if (Math.ceil(y) > (this.dest[0].y -100)) {
                    this.explode(new Vector3(x,y,z))
                }
            }

            if (count > 1) {
                this.material.opacity -= 0.015; 
                this.material.needsUpdate = true;
            }

            if (this.material.opacity <= 0 ){
                this.reset()
                this.done = true
                return
            }

            this.scene.add( this.points )
        }
    }

    public explode(  vector: Vector3 ) {
        this.scene.remove( this.points );  
        this.dest     = []; 
        this.colors   = []; 
        const MAX_POINTS = 100;
        this.geometry = new THREE.BufferGeometry();
        this.points   = new THREE.Points( this.geometry, this.material );
        const positions = new Float32Array( MAX_POINTS * 3 );
        const colors = new Float32Array( MAX_POINTS * 3 ); // r,g,b per colors
        this.geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ));
        this.geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ));
        // const alchcolors:Array<THREE.Color> = [
        //     new THREE.Color('rgb(62,150,15)'), // FUD
        //     new THREE.Color('rgb(250,121,15)'), // FOMO
        //     new THREE.Color('rgb(15,250,242)'), // ALPHA
        //     new THREE.Color('rgb(226,15,250)'), // KEK
        //     new THREE.Color('rgb(250,238,15)') // GLTR
        // ]
        
        for( let i = 0; i < 80; i++ )
        {
            // const color = alchcolors[THREE.MathUtils.randInt(0, 4)]
            const color = new THREE.Color()
            color.setHSL( THREE.MathUtils.randFloat( 0.1, 0.9 ), 1, 0.5 );
            this.colors.push( color ); 
            
            let from = new THREE.Vector3( 
                THREE.MathUtils.randInt( vector.x - 10, vector.x + 10 ), 
                THREE.MathUtils.randInt( vector.y - 10, vector.y + 10 ), 
                THREE.MathUtils.randInt( vector.z - 10, vector.z + 10 )
            ); 
            let to = new THREE.Vector3( 
                THREE.MathUtils.randInt( vector.x - 1000, vector.x + 1000 ), 
                THREE.MathUtils.randInt( vector.y - 1000, vector.y + 1000 ), 
                THREE.MathUtils.randInt( vector.z - 1000, vector.z + 1000 )
            ); 
            this.geometry.getAttribute('position').setXYZ(i, from.x, from.y, from.z)
            this.geometry.getAttribute('color').setXYZ(i, color.r, color.g, color.b)
            this.dest[i] = to
        }
        //this.geometry.setAttribute('color', new THREE.BufferAttribute( this.colors, 3 ))
    }

    public reset() {
        this.scene.remove(this.points)
        this.dest = []
        this.colors = []
        this.geometry = null
        this.points = null
    }
}