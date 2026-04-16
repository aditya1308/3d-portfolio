import * as THREE from "three";
import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import { EffectComposer, N8AO, Bloom } from "@react-three/postprocessing";

// ─── Config ────────────────────────────────────────────────────────────────

const TECHS = [
  { label: "JAVA",       image: "images/java.png",       color: "#E34F26" },
  { label: "SPRINGBOOT",    image: "images/springboot.png",     color: "#2496ED" },
  { label: "C++",        image: "images/c++.svg",        color: "#1572B6" },
  { label: "SPARK",       image: "images/spark.png",       color: "#CC6699" },
  { label: "AZURE", image: "images/azure-cloud.png", color: "#F7DF1E" },
  { label: "PYTHON",   image: "images/Python.png",      color: "#61DAFB" },
  { label: "GIT",     image: "images/git.png",     color: "#FFFFFF" },
  { label: "KAFKA",    image: "images/kafka.png",       color: "#339933" },
  { label: "EVENTHUB",   image: "images/eventhub.png",   color: "#FFCA28" },
  { label: "POSTGRESQL",    image: "images/postgresql.jpg",    color: "#47A248" },
];

const textureLoader = new THREE.TextureLoader();

// ─── Skill Tile ──────────────────────────────────────────────────────────────

type SkillTileProps = {
  label: string;
  image: string;
  color: string;
  position: [number, number, number];
  index: number;
};

function SkillTile({ label, image, color, position, index }: SkillTileProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const texture = useMemo(() => textureLoader.load(image), [image]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // Gentle floating animation (offset by index so they don't all move at once)
    const time = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * 1.5 + index) * 0.15;

    // Slight 3D tilt on hover
    const targetRotationX = hovered ? -0.15 : 0;
    const targetRotationY = hovered ? 0.2 : 0;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);

    // Scale up slightly on hover
    const targetScale = hovered ? 1.15 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  return (
    <group position={[position[0], 0, position[2]]}>
      {/* 3D Tile */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
        castShadow
      >
        <boxGeometry args={[1.8, 1.8, 0.2]} />
        <meshPhysicalMaterial
          map={texture}
          emissive={color}
          emissiveMap={texture}
          emissiveIntensity={hovered ? 0.8 : 0.2}
          roughness={0.4}
          metalness={0.5}
          clearcoat={0.3}
        />
        
        {/* Background Glow when hovered */}
        {hovered && (
          <mesh position={[0, 0, -0.15]}>
            <planeGeometry args={[1.8, 1.8]} />
            <meshBasicMaterial color={color} transparent opacity={0.25} />
          </mesh>
        )}
      </mesh>

      {/* Label Always Visible Below */}
      <Text
        position={[0, position[1] - 1.6, 0]}
        fontSize={0.35}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 8]} intensity={4} color="#a78bfa" distance={30} decay={2} />
      <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />

      {TECHS.map((tech, i) => {
        // Calculate a 2-row grid layout (5 items per row)
        const columns = 5;
        const col = i % columns;
        const row = Math.floor(i / columns);

        // Space items evenly. 
        // X goes from -6 to +6. Y is either +1.8 (top row) or -1.8 (bottom row)
        const x = (col - 2) * 3.2; 
        const y = row === 0 ? 0.9 : -2.5;

        return (
          <SkillTile
            key={`skill-${i}`}
            index={i}
            label={tech.label}
            image={tech.image}
            color={tech.color}
            position={[x, y, 0]}
          />
        );
      })}

      <Environment
        files="models/char_enviorment.hdr"
        environmentIntensity={0.3}
        environmentRotation={[0, 4, 2]}
      />

      <EffectComposer enableNormalPass={false}>
        <N8AO color="#0f002c" aoRadius={2} intensity={1} />
        <Bloom
          luminanceThreshold={0.6}
          luminanceSmoothing={0.4}
          intensity={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

// ─── TechStack ───────────────────────────────────────────────────────────────

const TechStack = () => {
  return (
    <div className="techstack" id="work">
      <h2>My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        // Adjusted camera to look straight at the grid
        camera={{ position: [0, 0, 16], fov: 38, near: 0.5, far: 200 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default TechStack;