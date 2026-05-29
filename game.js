const canvas = document.querySelector("#game");
const hud = document.querySelector(".hud");
const distanceEl = document.querySelector("#distance");
const sessionTimeEl = document.querySelector("#sessionTime");
const speedEl = document.querySelector("#speed");
const extinguishedEl = document.querySelector("#extinguished");
const bestEl = document.querySelector("#best");
const moistureEl = document.querySelector("#moisture");
const moistureSideEl = document.querySelector("#moistureSide");
const moistureFill = document.querySelector("#moistureFill");
const moistureBuffFill = document.querySelector("#moistureBuffFill");
const moistureGauge = document.querySelector("#moistureGauge");
const touchControls = document.querySelector("#touchControls");
const touchLeftButton = document.querySelector("#touchLeft");
const touchRightButton = document.querySelector("#touchRight");
const touchBoostButton = document.querySelector("#touchBoost");
const mobileTouchZones = document.querySelector("#mobileTouchZones");
const touchZoneLeft = document.querySelector("#touchZoneLeft");
const touchZoneRight = document.querySelector("#touchZoneRight");
const powerupRoulette = document.querySelector("#powerupRoulette");
const rouletteIconEl = document.querySelector("#rouletteIcon");
const powerupStatusEl = document.querySelector("#powerupStatus");
const supportMessageEl = document.querySelector("#supportMessage");
const menu = document.querySelector("#menu");
const tutorial = document.querySelector("#tutorial");
const tutorialCards = Array.from(document.querySelectorAll(".tutorial-card"));
const tutorialDots = document.querySelector("#tutorialDots");
const tutorialNextButton = document.querySelector("#tutorialNext");
const tutorialSkipButton = document.querySelector("#tutorialSkip");
const gameOver = document.querySelector("#gameOver");
const finalScore = document.querySelector("#finalScore");
const resultLine = document.querySelector("#resultLine");
const startButton = document.querySelector("#start");
const restartButton = document.querySelector("#restart");
const volumeButton = document.querySelector("[aria-label='Volume']");
const controlsButton = document.querySelector("#tutorialMenu");
const statDistanceEl = document.querySelector("#statDistance");
const statOpenTimeEl = document.querySelector("#statOpenTime");
const statExtinguishedEl = document.querySelector("#statExtinguished");
const statBestEl = document.querySelector("#statBest");
const playedAtEl = document.querySelector("#playedAt");
const surveySection = document.querySelector("#surveySection");
const symptomSurveyForm = document.querySelector("#symptomSurveyForm");
const submitSurveyButton = document.querySelector("#submitSurvey");
const skipSurveyButton = document.querySelector("#skipSurvey");
const nextBuffPanel = document.querySelector("#nextBuffPanel");
const nextBuffList = document.querySelector("#nextBuffList");
const nextBuffHeading = nextBuffPanel?.querySelector("h3");
const nextBuffBox = document.querySelector("#nextBuffBox");
const nextBuffRoulette = document.querySelector("#nextBuffRoulette");
const nextBuffHint = document.querySelector("#nextBuffHint");
const viewProgressMenuButton = document.querySelector("#viewProgressMenu");
const viewProgressResultsButton = document.querySelector("#viewProgressResults");
const progressOverlay = document.querySelector("#progressOverlay");
const closeProgressButton = document.querySelector("#closeProgress");
const screenshotProgressButton = document.querySelector("#screenshotProgress");
const progressSummary = document.querySelector("#progressSummary");
const progressInterpretations = document.querySelector("#progressInterpretations");
const symptomChart = document.querySelector("#symptomChart");
const chartLegend = document.querySelector("#chartLegend");
const progressSessions = document.querySelector("#progressSessions");
const progressRangeButtons = Array.from(document.querySelectorAll("[data-progress-range]"));
const resetStatisticsButton = document.querySelector("#resetStatistics");
const resetStatsModal = document.querySelector("#resetStatsModal");
const resetStatsConfirmInput = document.querySelector("#resetStatsConfirmInput");
const confirmResetStatsButton = document.querySelector("#confirmResetStats");
const cancelResetStatsButton = document.querySelector("#cancelResetStats");

const symptomControls = {
  craving: {
    input: document.querySelector("#symptomCraving"),
    value: document.querySelector("#symptomCravingValue"),
  },
  stress: {
    input: document.querySelector("#symptomStress"),
    value: document.querySelector("#symptomStressValue"),
  },
  concentration: {
    input: document.querySelector("#symptomConcentration"),
    value: document.querySelector("#symptomConcentrationValue"),
  },
  restlessness: {
    input: document.querySelector("#symptomRestlessness"),
    value: document.querySelector("#symptomRestlessnessValue"),
  },
  fatigue: {
    input: document.querySelector("#symptomFatigue"),
    value: document.querySelector("#symptomFatigueValue"),
  },
};

const TAU = Math.PI * 2;
const START_ANGLE = -Math.PI * 0.5;
const TUBE_RADIUS = 7.5;
const TUBE_LENGTH = 420;
const PLAYER_WIDTH = 0.075;
const PLAYER_DEPTH = 0.48;
const SPAWN_AHEAD = 310;
const START_CLEAR_DISTANCE = 30;
const FIRST_HAZARD_DISTANCE = 58;
const FIRE_EXTINGUISH_RATE = 2.65;
const MAX_MOISTURE = 100;
const MAX_BACKPACK_MOISTURE = 150;
const WATER_PICKUP_VALUE = 34;
const WATER_POOL_REFILL_RATE = 24;
const BOOST_DRAIN_RATE = 3.15;
const BASE_RUN_SPEED = 28.8;
const BOOST_SPEED_MULTIPLIER = 1.12;
const SPEED_PAD_DURATION = 2.8;
const SPEED_PAD_MULTIPLIER = 1.38;
const SIDE_DASH_DISTANCE = 3.25;
const SIDE_DASH_ANGLE = SIDE_DASH_DISTANCE / TUBE_RADIUS;
const SIDE_DASH_TAP_WINDOW = 0.28;
const SIDE_DASH_COOLDOWN = 0.42;
const SHOW_HITBOXES = false;
const COLLAPSED_WALL_MIN_HAZARD_GAP = 5;
const ASH_ASTEROID_SURFACE_INSET = 1.18;
const DEFAULT_BEAM_RANGE_MULTIPLIER = 1.14;
const BEAM_RANGE_BUFF_MULTIPLIER = 2;
const WATER_MAGNET_RANGE_Z = 24;
const WATER_MAGNET_RING_RANGE_Z = 30;
const WATER_MAGNET_RANGE_ANGLE = 0.72;
const POWERUP_DURATION = 10;
const POWERUP_ROLL_DURATION = 1.25;
const SUPPORT_BUFF_DURATION = 30;
const INTRO_LOOP_DURATION = 20;
const INTRO_RUN_TUBE_RADIUS = 1.36;
const INTRO_RUN_TUBE_LENGTH = 7.4;
const INTRO_RUN_CENTER = new THREE.Vector3(0, 0.86, 0.08);
const SIZE_BAND_STEP = 10;
const POWERUP_OPTIONS = [
  { type: "warning", label: "WARN" },
  { type: "backpack", label: "PACK" },
  { type: "beam", label: "2X" },
  { type: "magnet", label: "MAG" },
  { type: "warning", label: "SCAN" },
  { type: "backpack", label: "TANK" },
  { type: "beam", label: "RANGE" },
  { type: "magnet", label: "DRAW" },
];
const BEST_KEY = "cigaretteTunnelBest3dV2";
const SURVEY_HISTORY_KEY = "cigARunSymptomSurveyHistoryV1";
const NEXT_ADAPTATION_KEY = "cigARunNextAdaptationV1";
const RUN_NUMBER_KEY = "cigARunRunNumberV1";
const DEFAULT_ADAPTATION_CONFIG = Object.freeze({
  waterPickupMultiplier: 1,
  tobaccoPileMultiplier: 1,
  rewardFeedbackMultiplier: 1,
  earlyDifficultyMultiplier: 1,
  hazardDensityMultiplier: 1,
  warningTimeMultiplier: 1,
  visualClarityBoost: false,
  coolingVisualBoost: false,
  calmMode: false,
  gentleMode: false,
  movementIntensityMultiplier: 1,
  wallRunFrequencyMultiplier: 1,
  supportiveMessageMode: false,
});
const SYMPTOM_DEFINITIONS = [
  { key: "craving", label: "Craving intensity", color: "#0b8de3" },
  { key: "stress", label: "Stress / irritability", color: "#e2504f" },
  { key: "concentration", label: "Difficulty concentrating", color: "#9467bd" },
  { key: "restlessness", label: "Restlessness", color: "#f1a208" },
  { key: "fatigue", label: "Cessation fatigue", color: "#2ca25f" },
];
const PROGRESS_RANGES = Object.freeze({
  week: { label: "Last week", days: 7 },
  month: { label: "Last month", days: 31 },
  year: { label: "Last year", days: 365 },
});
const BASELINE_WINDOW_SIZE = 5;
const SYMPTOM_KEY_ALIASES = Object.freeze({
  cravingIntensity: "craving",
  stressIrritability: "stress",
  difficultyConcentrating: "concentration",
  restlessness: "restlessness",
  cessationFatigue: "fatigue",
});
const SYMPTOM_EXTERNAL_KEYS = Object.freeze({
  craving: "cravingIntensity",
  stress: "stressIrritability",
  concentration: "difficultyConcentrating",
  restlessness: "restlessness",
  fatigue: "cessationFatigue",
});
const SYMPTOM_RISK_WEIGHTS = Object.freeze({
  craving: 3,
  stress: 2,
  concentration: 2,
  restlessness: 1,
  fatigue: 3,
});
const RUN_WALL_COLOR = new THREE.Color(0xd9d1bd);
const RUN_LIGHT_COLOR = new THREE.Color(0xf2ead7);
const LOCAL_UP = new THREE.Vector3(0, 1, 0);
const PLAYER_CENTER_Y = 0.86;
const HAND_GRAB_SCENE_DURATION = 2.7;

const player = {
  angle: START_ANGLE,
  targetAngle: START_ANGLE,
  slideVelocity: 0,
  tarContact: 0,
  crushed: false,
  z: 0,
};

let state = "menu";
let lastTime = 0;
let lastFrameAt = 0;
let gameOpenedAt = performance.now();
let distance = 0;
let speed = 1;
let moisture = MAX_MOISTURE;
let extinguishedCount = 0;
let best = Number(localStorage.getItem(BEST_KEY) || 0);
let hazardAngle = START_ANGLE;
let nextHazardEdgeZ = -FIRST_HAZARD_DISTANCE;
let hazardsSinceHand = 0;
let hazardsSinceWall = COLLAPSED_WALL_MIN_HAZARD_GAP;
let grabScene = null;
let endCameraFreeze = null;
let runStartedAt = null;
let runStartedAtMs = 0;
let currentRunNumber = Number(localStorage.getItem(RUN_NUMBER_KEY) || 0);
let progressRange = "year";
let pendingRunStats = null;
let pendingSurveyResolved = false;
let nextDistanceMilestone = 1000;
let lastGuideDistance = -999;
let lastMoistureWarningAt = -999;
let obstacles = [];
let smoke = [];
let splashes = [];
let keys = new Set();
let touchSteer = 0;
let boostActive = false;
let boostPulse = 0;
let tarSoundCooldown = 0;
let handSoundCooldown = 0;
let asteroidSoundCooldown = 0;
let waterPoolSoundCooldown = 0;
let speedPadTimer = 0;
let speedPadSoundCooldown = 0;
let waterBopCooldown = 0;
let sideDashCooldown = 0;
let sideDashPulse = 0;
let lastSideTap = { left: -999, right: -999 };
let activeTouchPointerId = null;
let activeTouchDirection = 0;
let pointerDown = false;
let pointerStartX = 0;
let pointerStartAngle = START_ANGLE;
let waterSpray = null;
let lastMoistureBand = Math.ceil(MAX_MOISTURE / SIZE_BAND_STEP);
let sizeCallouts = [];
let activePowerup = null;
let powerupRoll = null;
let warningIndicators = [];
let waterBackpackActive = false;
let waterBackpack = null;
let waterMagnet = null;
let activeRunAdaptation = createDefaultAdaptationState();
let activeSupportBuffTimer = 0;
let supportMessageTimer = 0;
let nextBuffRouletteTimer = null;
let audioCtx = null;
let masterGain = null;
let musicGain = null;
let sfxGain = null;
let musicNodes = [];
let musicTimer = null;
let musicStep = 0;
let musicPhraseIndex = 0;
let audioMuted = false;
let audioUnlockPromise = null;
let lastDirectAudioUnlockAt = -999;
let resultAnimationToken = 0;
let tutorialIndex = 0;
let tutorialSeen = false;

bestEl.textContent = `${Math.floor(best)}m`;

if (!window.THREE) {
  throw new Error("Three.js failed to load.");
}

THREE.ColorManagement.enabled = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x130c09);
scene.fog = new THREE.FogExp2(0x130c09, 0.0105);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: !isLikelyMobileDevice(),
  powerPreference: "high-performance",
});
renderer.setPixelRatio(getRendererPixelRatio());
renderer.setClearColor(0x130c09, 1);
renderer.outputEncoding = THREE.sRGBEncoding;

const camera = new THREE.PerspectiveCamera(92, 1, 0.08, 650);
scene.add(camera);

const headLamp = new THREE.PointLight(0xf2ead7, 2.15, 150, 1.35);
headLamp.position.set(0, 0, -6);
camera.add(headLamp);

scene.add(new THREE.AmbientLight(0xcfc5ad, 0.42));

const emberLight = new THREE.PointLight(0xff5d2f, 2.1, 55, 1.9);
scene.add(emberLight);

const tunnelGlowLight = new THREE.PointLight(0xffefc6, 2.75, 175, 1.24);
scene.add(tunnelGlowLight);

const tunnelGlowSprite = createGlowSprite();
scene.add(tunnelGlowSprite);

const shared = createSharedAssets();
const tube = createTunnel();
const rings = createDepthRings();
const playerRig = createRunner();
const smokeGroup = new THREE.Group();
const splashGroup = new THREE.Group();
const calloutGroup = new THREE.Group();
const warningGroup = new THREE.Group();
const magnetSiphonGroup = new THREE.Group();
const introStage = createIntroStage();

scene.add(tube);
scene.add(rings);
scene.add(playerRig);
scene.add(smokeGroup);
scene.add(splashGroup);
scene.add(calloutGroup);
scene.add(warningGroup);
scene.add(magnetSiphonGroup);
scene.add(introStage);

resize();
requestAnimationFrame(loop);
setInterval(() => {
  const now = performance.now();
  if (now - lastFrameAt > 80) {
    tick(now);
  }
}, 50);

function createGlowSprite() {
  const texCanvas = document.createElement("canvas");
  texCanvas.width = 256;
  texCanvas.height = 256;
  const c = texCanvas.getContext("2d");
  const gradient = c.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, "rgba(255, 244, 202, 0.7)");
  gradient.addColorStop(0.28, "rgba(255, 210, 125, 0.2)");
  gradient.addColorStop(1, "rgba(255, 210, 125, 0)");
  c.fillStyle = gradient;
  c.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(texCanvas);
  const material = new THREE.SpriteMaterial({
    map: texture,
    color: 0xffedc2,
    transparent: true,
    opacity: 0.46,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sprite = new THREE.Sprite(material);
  sprite.name = "warm-tunnel-end-glow";
  sprite.scale.set(28, 28, 1);
  return sprite;
}

function createTextSprite(text, options = {}) {
  const {
    fontSize = 42,
    color = "#fff5c4",
    stroke = "rgba(60, 22, 6, 0.9)",
    background = "rgba(0, 0, 0, 0)",
    padding = 18,
    width = 512,
    height = 160,
  } = options;
  const texCanvas = document.createElement("canvas");
  texCanvas.width = width;
  texCanvas.height = height;
  const ctx = texCanvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);
  if (background !== "rgba(0, 0, 0, 0)") {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${fontSize}px Inter, Arial, sans-serif`;
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(4, fontSize * 0.14);
  ctx.strokeStyle = stroke;
  ctx.fillStyle = color;
  ctx.strokeText(text, width * 0.5, height * 0.5 + padding * 0.05);
  ctx.fillText(text, width * 0.5, height * 0.5 + padding * 0.05);

  const texture = new THREE.CanvasTexture(texCanvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.userData.texture = texture;
  sprite.userData.baseScale = options.baseScale || new THREE.Vector3(3.4, 1.06, 1);
  sprite.scale.copy(sprite.userData.baseScale);
  return sprite;
}

function disposeSprite(sprite) {
  if (!sprite) return;
  if (sprite.material) {
    if (sprite.material.map) sprite.material.map.dispose();
    sprite.material.dispose();
  }
}

function markDebugVisual(object) {
  if (!object) return object;
  object.userData.debugVisual = true;
  object.visible = SHOW_HITBOXES;
  return object;
}

function createQuestionMarkPanel(size = 0.82) {
  const texCanvas = document.createElement("canvas");
  texCanvas.width = 256;
  texCanvas.height = 256;
  const ctx = texCanvas.getContext("2d");
  ctx.clearRect(0, 0, 256, 256);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 178px Inter, Arial, sans-serif";
  ctx.lineWidth = 18;
  ctx.strokeStyle = "rgba(255, 246, 192, 0.86)";
  ctx.fillStyle = "rgba(72, 37, 0, 0.94)";
  ctx.strokeText("?", 128, 132);
  ctx.fillText("?", 128, 132);

  const texture = new THREE.CanvasTexture(texCanvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(size, size), material);
  panel.name = "gold-box-question-mark";
  return panel;
}

function addQuestionMarksToBox(box) {
  const faceOffset = 0.505;
  const faces = [
    { position: [0, 0, faceOffset], rotation: [0, 0, 0] },
    { position: [0, 0, -faceOffset], rotation: [0, Math.PI, 0] },
    { position: [faceOffset, 0, 0], rotation: [0, Math.PI * 0.5, 0] },
    { position: [-faceOffset, 0, 0], rotation: [0, -Math.PI * 0.5, 0] },
    { position: [0, faceOffset, 0], rotation: [-Math.PI * 0.5, 0, 0] },
    { position: [0, -faceOffset, 0], rotation: [Math.PI * 0.5, 0, 0] },
  ];
  for (const face of faces) {
    const panel = createQuestionMarkPanel(0.78);
    panel.position.set(...face.position);
    panel.rotation.set(...face.rotation);
    box.add(panel);
  }
}

function createSharedAssets() {
  const skin = new THREE.MeshStandardMaterial({
    color: 0xf2d1aa,
    roughness: 0.72,
  });
  const cloth = new THREE.MeshStandardMaterial({
    color: 0xf4e6d1,
    roughness: 0.8,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x1c1714,
    roughness: 0.85,
  });
  const smokeMaterial = new THREE.MeshBasicMaterial({
    color: 0xd8d0bd,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  });
  const tarMaterial = new THREE.MeshStandardMaterial({
    color: 0x080503,
    roughness: 0.24,
    metalness: 0.04,
    side: THREE.DoubleSide,
  });
  const tarSheenMaterial = new THREE.MeshBasicMaterial({
    color: 0x6b3b18,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const tarBubbleMaterial = new THREE.MeshStandardMaterial({
    color: 0x1b0d06,
    roughness: 0.18,
    metalness: 0.02,
  });
  const handMaterial = new THREE.MeshStandardMaterial({
    color: 0xd9b64b,
    emissive: 0x8a5d08,
    emissiveIntensity: 0.14,
    roughness: 0.62,
    transparent: true,
    opacity: 0.94,
    depthWrite: false,
  });
  const handPalmMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0d25a,
    emissive: 0x9a6909,
    emissiveIntensity: 0.16,
    roughness: 0.58,
    transparent: true,
    opacity: 0.97,
    depthWrite: false,
  });
  const obstacleHitboxMaterial = new THREE.MeshBasicMaterial({
    color: 0x20ff82,
    transparent: true,
    opacity: 0.82,
    wireframe: true,
    depthWrite: false,
  });
  const playerHitboxMaterial = new THREE.MeshBasicMaterial({
    color: 0x35d9ff,
    transparent: true,
    opacity: 0.88,
    wireframe: true,
    depthWrite: false,
  });
  const handHitboxMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd12e,
    transparent: true,
    opacity: 0.95,
    wireframe: true,
    depthWrite: false,
  });
  const handRangeMaterial = new THREE.MeshBasicMaterial({
    color: 0xfff1a6,
    transparent: true,
    opacity: 0.12,
    wireframe: true,
    depthWrite: false,
  });
  const handRangeFillMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
    vertexColors: true,
    depthWrite: false,
  });
  const handBoundaryMaterial = new THREE.LineBasicMaterial({
    color: 0xb86a13,
    transparent: true,
    opacity: 0.86,
    depthWrite: false,
  });
  const waterMonsterMaterial = new THREE.MeshStandardMaterial({
    color: 0x58c7f0,
    emissive: 0x0a6f9f,
    emissiveIntensity: 0.2,
    roughness: 0.24,
    metalness: 0.02,
    transparent: true,
    opacity: 0.92,
  });
  const waterBellyMaterial = new THREE.MeshStandardMaterial({
    color: 0xd7f8ff,
    emissive: 0x7adff5,
    emissiveIntensity: 0.18,
    roughness: 0.16,
    transparent: true,
    opacity: 0.72,
  });
  const waterFinMaterial = new THREE.MeshStandardMaterial({
    color: 0x2ca8dc,
    emissive: 0x0a5a80,
    emissiveIntensity: 0.14,
    roughness: 0.34,
    transparent: true,
    opacity: 0.92,
  });
  const waterOutlineMaterial = new THREE.MeshBasicMaterial({
    color: 0x0874a8,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.58,
  });
  const waterSprayMaterial = new THREE.MeshBasicMaterial({
    color: 0x91efff,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });
  const waterFoamMaterial = new THREE.MeshBasicMaterial({
    color: 0xe9fbff,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
  });
  const tobaccoMaterial = new THREE.MeshStandardMaterial({
    color: 0x70401e,
    roughness: 0.92,
    metalness: 0,
  });
  const charredTobaccoMaterial = new THREE.MeshStandardMaterial({
    color: 0x16110d,
    roughness: 0.96,
    metalness: 0,
  });
  const emberMaterial = new THREE.MeshStandardMaterial({
    color: 0xff682b,
    emissive: 0xff3a0a,
    emissiveIntensity: 1.8,
    roughness: 0.38,
  });
  const flameMaterial = new THREE.MeshBasicMaterial({
    color: 0xff781e,
    transparent: true,
    opacity: 0.94,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const flameCoreMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffa8,
    transparent: true,
    opacity: 0.96,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const fireSmokeMaterial = new THREE.MeshBasicMaterial({
    color: 0x090604,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  const fireHitboxMaterial = new THREE.MeshBasicMaterial({
    color: 0xff7b24,
    transparent: true,
    opacity: 0.88,
    wireframe: true,
    depthWrite: false,
  });
  const fireRangeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffed45,
    transparent: true,
    opacity: 0.42,
    wireframe: true,
    depthWrite: false,
  });
  const fireTargetMaterial = new THREE.MeshBasicMaterial({
    color: 0x42d8ff,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const fireObjectiveAuraMaterial = new THREE.MeshBasicMaterial({
    color: 0x1ebeff,
    transparent: true,
    opacity: 0.26,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const fireGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffb321,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const splashMaterial = new THREE.MeshBasicMaterial({
    color: 0xaef5ff,
    transparent: true,
    opacity: 0.84,
    depthWrite: false,
  });
  const waterPickupMaterial = new THREE.MeshStandardMaterial({
    color: 0x72dfff,
    emissive: 0x0fa8e4,
    emissiveIntensity: 0.58,
    roughness: 0.12,
    transparent: true,
    opacity: 0.9,
  });
  const waterPickupGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0xbef9ff,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const waterPickupHitboxMaterial = new THREE.MeshBasicMaterial({
    color: 0x64e8ff,
    transparent: true,
    opacity: 0.86,
    wireframe: true,
    depthWrite: false,
  });
  const waterPoolMaterial = new THREE.MeshBasicMaterial({
    color: 0x31cfff,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const waterPoolHitboxMaterial = new THREE.MeshBasicMaterial({
    color: 0x9cf7ff,
    transparent: true,
    opacity: 0.76,
    wireframe: true,
    depthWrite: false,
  });
  const speedPadMaterial = new THREE.MeshBasicMaterial({
    color: 0xffc533,
    transparent: true,
    opacity: 0.46,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const speedPadArrowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const speedPadHitboxMaterial = new THREE.MeshBasicMaterial({
    color: 0xfff06a,
    transparent: true,
    opacity: 0.86,
    wireframe: true,
    depthWrite: false,
  });
  const collapsedWallMaterial = new THREE.MeshStandardMaterial({
    color: 0xd8cdb6,
    roughness: 0.94,
    metalness: 0,
    side: THREE.DoubleSide,
  });
  const collapsedWallEdgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x8d7351,
    roughness: 0.9,
    metalness: 0,
  });
  const collapsedWallHitboxMaterial = new THREE.MeshBasicMaterial({
    color: 0xff354a,
    transparent: true,
    opacity: 0.88,
    wireframe: true,
    depthWrite: false,
  });
  const powerupBoxMaterial = new THREE.MeshStandardMaterial({
    color: 0xffc331,
    emissive: 0x9d6500,
    emissiveIntensity: 0.44,
    roughness: 0.2,
    metalness: 0.16,
    transparent: true,
    opacity: 0.96,
  });
  const powerupPanelMaterial = new THREE.MeshBasicMaterial({
    color: 0xf8fbff,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
  });
  const powerupHitboxMaterial = new THREE.MeshBasicMaterial({
    color: 0xffea63,
    transparent: true,
    opacity: 0.86,
    wireframe: true,
    depthWrite: false,
  });
  const warningLineMaterial = new THREE.LineBasicMaterial({
    color: 0xffd24a,
    transparent: true,
    opacity: 0.96,
    depthWrite: false,
  });
  const warningPatchMaterial = new THREE.MeshBasicMaterial({
    color: 0xffae22,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const backpackMaterial = new THREE.MeshStandardMaterial({
    color: 0xffcf38,
    emissive: 0xb37700,
    emissiveIntensity: 0.36,
    roughness: 0.2,
    transparent: true,
    opacity: 0.92,
  });
  const backpackStrapMaterial = new THREE.MeshStandardMaterial({
    color: 0x6b4100,
    emissive: 0x3c2400,
    emissiveIntensity: 0.12,
    roughness: 0.48,
  });
  const ashMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a4036,
    emissive: 0x2b1608,
    emissiveIntensity: 0.18,
    roughness: 0.88,
    metalness: 0.02,
  });
  const ashHotMaterial = new THREE.MeshBasicMaterial({
    color: 0xff7c28,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const ashHitboxMaterial = new THREE.MeshBasicMaterial({
    color: 0xff3d24,
    transparent: true,
    opacity: 0.84,
    wireframe: true,
    depthWrite: false,
  });

  return {
    skin,
    cloth,
    dark,
    smokeMaterial,
    tarMaterial,
    tarSheenMaterial,
    tarBubbleMaterial,
    handMaterial,
    handPalmMaterial,
    obstacleHitboxMaterial,
    playerHitboxMaterial,
    handHitboxMaterial,
    handRangeMaterial,
    handRangeFillMaterial,
    handBoundaryMaterial,
    waterMonsterMaterial,
    waterBellyMaterial,
    waterFinMaterial,
    waterOutlineMaterial,
    waterSprayMaterial,
    waterFoamMaterial,
    tobaccoMaterial,
    charredTobaccoMaterial,
    emberMaterial,
    flameMaterial,
    flameCoreMaterial,
    fireSmokeMaterial,
    fireHitboxMaterial,
    fireRangeMaterial,
    fireTargetMaterial,
    fireObjectiveAuraMaterial,
    fireGlowMaterial,
    splashMaterial,
    waterPickupMaterial,
    waterPickupGlowMaterial,
    waterPickupHitboxMaterial,
    waterPoolMaterial,
    waterPoolHitboxMaterial,
    speedPadMaterial,
    speedPadArrowMaterial,
    speedPadHitboxMaterial,
    collapsedWallMaterial,
    collapsedWallEdgeMaterial,
    collapsedWallHitboxMaterial,
    powerupBoxMaterial,
    powerupPanelMaterial,
    powerupHitboxMaterial,
    warningLineMaterial,
    warningPatchMaterial,
    backpackMaterial,
    backpackStrapMaterial,
    ashMaterial,
    ashHotMaterial,
    ashHitboxMaterial,
    dashTrailMaterial: new THREE.MeshBasicMaterial({
      color: 0xcdf8ff,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
    torsoGeometry: createTorsoGeometry(),
    hipsGeometry: createHipsGeometry(),
    monsterBodyGeometry: createDropletGeometry(36),
    monsterHeadGeometry: new THREE.SphereGeometry(0.32, 22, 14),
    monsterEyeGeometry: new THREE.SphereGeometry(0.042, 10, 8),
    monsterFinGeometry: new THREE.ConeGeometry(0.18, 0.58, 3),
    monsterTentacleGeometry: new THREE.CylinderGeometry(0.04, 0.075, 1, 10),
    dropLimbGeometry: new THREE.CylinderGeometry(0.026, 0.036, 1, 10),
    waterDropletGeometry: new THREE.SphereGeometry(1, 12, 8),
    waterStreamGeometry: createWaterStreamGeometry(),
    dashStreakGeometry: createDashStreakGeometry(),
    speedPadArrowGeometry: createSpeedPadArrowGeometry(),
    waterPickupRingGeometry: new THREE.TorusGeometry(0.7, 0.035, 8, 42),
    powerupBoxGeometry: new THREE.BoxGeometry(1, 1, 1),
    backpackTankGeometry: new THREE.SphereGeometry(0.32, 18, 12),
    backpackStrapGeometry: new THREE.TorusGeometry(0.22, 0.018, 8, 24),
    ashGeometry: new THREE.IcosahedronGeometry(1, 1),
    headGeometry: new THREE.SphereGeometry(0.24, 18, 12),
    neckGeometry: new THREE.CylinderGeometry(0.1, 0.12, 0.18, 12),
    shoulderGeometry: new THREE.SphereGeometry(0.14, 12, 8),
    upperArmGeometry: new THREE.CylinderGeometry(0.06, 0.075, 1, 10),
    forearmGeometry: new THREE.CylinderGeometry(0.052, 0.062, 1, 10),
    handGeometry: new THREE.SphereGeometry(0.075, 12, 8),
    thighGeometry: new THREE.CylinderGeometry(0.09, 0.105, 1, 12),
    shinGeometry: new THREE.CylinderGeometry(0.065, 0.08, 1, 10),
    footGeometry: new THREE.BoxGeometry(0.18, 0.08, 0.32),
    smokeGeometry: new THREE.SphereGeometry(1, 10, 8),
    bubbleGeometry: new THREE.SphereGeometry(1, 16, 10),
    handWristGeometry: new THREE.CylinderGeometry(0.25, 0.4, 1, 22),
    handPalmGeometry: new THREE.SphereGeometry(0.62, 30, 20),
    handPalmPadGeometry: new THREE.SphereGeometry(0.34, 22, 14),
    handKnuckleGeometry: new THREE.SphereGeometry(0.16, 18, 12),
    handFingerGeometry: new THREE.CylinderGeometry(0.105, 0.145, 1, 18),
    handFingerTipGeometry: new THREE.SphereGeometry(0.19, 18, 12),
    handFingerPadGeometry: new THREE.SphereGeometry(0.13, 16, 10),
    handCuffRingGeometry: new THREE.TorusGeometry(0.38, 0.038, 10, 36),
    handJointGeometry: new THREE.SphereGeometry(0.34, 22, 14),
    handHitboxGeometry: new THREE.SphereGeometry(0.82, 16, 10),
    tobaccoChunkGeometry: new THREE.CylinderGeometry(0.18, 0.24, 1, 7),
    tobaccoClumpGeometry: new THREE.SphereGeometry(0.34, 12, 8),
    flameGeometry: new THREE.ConeGeometry(0.32, 1, 7),
  };
}

function createWaterStreamGeometry() {
  const geometry = new THREE.CylinderGeometry(0.11, 0.2, 1, 16, 1, true);
  geometry.rotateX(Math.PI * 0.5);
  return geometry;
}

function createDashStreakGeometry() {
  const geometry = new THREE.CylinderGeometry(0.012, 0.038, 1, 8, 1, true);
  geometry.rotateX(Math.PI * 0.5);
  return geometry;
}

function createSpeedPadArrowGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.78);
  shape.lineTo(-0.42, -0.24);
  shape.lineTo(-0.16, -0.2);
  shape.lineTo(-0.16, -0.72);
  shape.lineTo(0.16, -0.72);
  shape.lineTo(0.16, -0.2);
  shape.lineTo(0.42, -0.24);
  shape.lineTo(0, 0.78);
  return new THREE.ShapeGeometry(shape);
}

function createDropletGeometry(segments = 32) {
  return createBodyProfileGeometry([
    { y: -0.58, rx: 0.06, rz: 0.04 },
    { y: -0.5, rx: 0.36, rz: 0.26 },
    { y: -0.28, rx: 0.55, rz: 0.38 },
    { y: 0.08, rx: 0.62, rz: 0.43 },
    { y: 0.42, rx: 0.5, rz: 0.35 },
    { y: 0.76, rx: 0.29, rz: 0.23 },
    { y: 1.05, rx: 0.13, rz: 0.11 },
    { y: 1.3, rx: 0.035, rz: 0.03 },
    { y: 1.4, rx: 0.002, rz: 0.002 },
  ], segments);
}

function createTorsoGeometry() {
  return createBodyProfileGeometry([
    { y: -0.45, rx: 0.22, rz: 0.14 },
    { y: -0.24, rx: 0.27, rz: 0.17 },
    { y: 0.05, rx: 0.36, rz: 0.2 },
    { y: 0.28, rx: 0.42, rz: 0.22 },
    { y: 0.45, rx: 0.32, rz: 0.18 },
  ], 20);
}

function createHipsGeometry() {
  return createBodyProfileGeometry([
    { y: -0.18, rx: 0.39, rz: 0.19 },
    { y: 0.02, rx: 0.34, rz: 0.17 },
    { y: 0.2, rx: 0.24, rz: 0.14 },
  ], 20);
}

function createBodyProfileGeometry(profile, segments) {
  const vertices = [];
  const indices = [];

  for (let i = 0; i < profile.length; i += 1) {
    const ring = profile[i];
    for (let j = 0; j < segments; j += 1) {
      const t = (j / segments) * TAU;
      vertices.push(Math.cos(t) * ring.rx, ring.y, Math.sin(t) * ring.rz);
    }
  }

  for (let i = 0; i < profile.length - 1; i += 1) {
    for (let j = 0; j < segments; j += 1) {
      const next = (j + 1) % segments;
      const a = i * segments + j;
      const b = i * segments + next;
      const c = (i + 1) * segments + j;
      const d = (i + 1) * segments + next;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createTunnel() {
  const paperTexture = createTunnelTexture();
  paperTexture.wrapS = THREE.RepeatWrapping;
  paperTexture.wrapT = THREE.RepeatWrapping;
  paperTexture.repeat.set(4.2, 18);

  const geometry = new THREE.CylinderGeometry(TUBE_RADIUS, TUBE_RADIUS, TUBE_LENGTH, 128, 48, true);
  geometry.rotateX(Math.PI * 0.5);

  const material = new THREE.MeshStandardMaterial({
    color: RUN_WALL_COLOR,
    map: paperTexture,
    side: THREE.BackSide,
    roughness: 0.98,
    metalness: 0,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "cigarette-paper-tunnel";
  return mesh;
}

function createTunnelTexture() {
  const texCanvas = document.createElement("canvas");
  texCanvas.width = 512;
  texCanvas.height = 1024;
  const c = texCanvas.getContext("2d");

  const gradient = c.createLinearGradient(0, 0, texCanvas.width, 0);
  gradient.addColorStop(0, "#d5cbb2");
  gradient.addColorStop(0.22, "#eee8d4");
  gradient.addColorStop(0.58, "#f7f1df");
  gradient.addColorStop(1, "#c9bea3");
  c.fillStyle = gradient;
  c.fillRect(0, 0, texCanvas.width, texCanvas.height);

  for (let i = 0; i < 30; i += 1) {
    const x = Math.random() * texCanvas.width;
    const y = Math.random() * texCanvas.height;
    const radius = THREE.MathUtils.randFloat(90, 260);
    const patch = c.createRadialGradient(x, y, 0, x, y, radius);
    patch.addColorStop(0, `rgba(255, 248, 220, ${THREE.MathUtils.randFloat(0.035, 0.075)})`);
    patch.addColorStop(1, "rgba(255, 255, 255, 0)");
    c.fillStyle = patch;
    c.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  for (let i = 0; i < 360; i += 1) {
    const x = Math.random() * texCanvas.width;
    const y = Math.random() * texCanvas.height;
    const length = THREE.MathUtils.randFloat(70, 340);
    const angle = THREE.MathUtils.randFloatSpread(0.18) + Math.PI * 0.5;
    const waviness = THREE.MathUtils.randFloat(8, 32);
    const alpha = THREE.MathUtils.randFloat(0.045, 0.13);
    const tone = Math.random() > 0.68 ? "184, 163, 116" : "92, 84, 67";
    drawPaperFiber(c, x, y, length, angle, waviness, `rgba(${tone}, ${alpha})`, THREE.MathUtils.randFloat(0.45, 1.5));
  }

  for (let i = 0; i < 760; i += 1) {
    const x = Math.random() * texCanvas.width;
    const y = Math.random() * texCanvas.height;
    const length = THREE.MathUtils.randFloat(8, 46);
    const angle = THREE.MathUtils.randFloatSpread(Math.PI);
    const alpha = THREE.MathUtils.randFloat(0.035, 0.11);
    drawPaperFiber(c, x, y, length, angle, 2, `rgba(118, 101, 72, ${alpha})`, THREE.MathUtils.randFloat(0.35, 1.15));
  }

  for (let i = 0; i < 3500; i += 1) {
    const x = Math.random() * texCanvas.width;
    const y = Math.random() * texCanvas.height;
    const size = Math.random() > 0.92 ? THREE.MathUtils.randFloat(1.2, 2.6) : 1;
    const tone = Math.random() > 0.58 ? "255, 246, 216" : "83, 72, 54";
    c.fillStyle = `rgba(${tone}, ${0.022 + Math.random() * 0.07})`;
    c.fillRect(x, y, size, size);
  }

  return new THREE.CanvasTexture(texCanvas);
}

function drawPaperFiber(ctx, x, y, length, angle, waviness, color, width) {
  const half = length * 0.5;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(-half, 0);
  ctx.bezierCurveTo(
    -half * 0.35,
    Math.sin(x * 0.01) * waviness,
    half * 0.34,
    Math.cos(y * 0.01) * waviness,
    half,
    THREE.MathUtils.randFloatSpread(waviness * 0.5),
  );
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.restore();
}

function createDepthRings() {
  const group = new THREE.Group();
  const ringGeometry = new THREE.TorusGeometry(TUBE_RADIUS - 0.025, 0.018, 8, 128);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xffe0ad,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  });

  for (let i = 0; i < 34; i += 1) {
    const ring = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    ring.userData.offset = -i * 7.2;
    group.add(ring);
  }

  return group;
}

function getIntroRunFrame(x, angle, height = 0.34) {
  const radial = new THREE.Vector3(0, Math.sin(angle), Math.cos(angle)).normalize();
  const inward = radial.clone().multiplyScalar(-1);
  const right = new THREE.Vector3(0, Math.cos(angle), -Math.sin(angle)).normalize();
  const forward = new THREE.Vector3(1, 0, 0);
  const wall = INTRO_RUN_CENTER
    .clone()
    .add(new THREE.Vector3(x, 0, 0))
    .add(radial.clone().multiplyScalar(INTRO_RUN_TUBE_RADIUS));
  const root = wall.clone().add(inward.clone().multiplyScalar(height));
  return { radial, inward, right, forward, wall, root };
}

function orientIntroWallGroup(group, x, angle, height = 0.05) {
  const frame = getIntroRunFrame(x, angle, height);
  const basis = new THREE.Matrix4().makeBasis(frame.right, frame.inward, frame.forward);
  group.position.copy(frame.root);
  group.quaternion.setFromRotationMatrix(basis);
  return frame;
}

function createIntroStage() {
  const group = new THREE.Group();
  group.name = "intro-loop-stage";
  group.visible = true;

  const paper = new THREE.MeshStandardMaterial({ color: 0xf2ead5, roughness: 0.9 });
  const filter = new THREE.MeshStandardMaterial({ color: 0xc18845, roughness: 0.82 });
  const ember = shared.emberMaterial.clone();
  const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xd8a47c, roughness: 0.7 });
  const shirtMaterial = new THREE.MeshStandardMaterial({ color: 0x29394b, roughness: 0.78 });
  const cloudMaterial = new THREE.MeshBasicMaterial({
    color: 0xd8d5ce,
    transparent: true,
    opacity: 0.64,
    depthWrite: false,
  });

  const cloudGroup = new THREE.Group();
  cloudGroup.name = "intro-cloud-bank";
  group.add(cloudGroup);
  const cloudPuffs = [];
  for (let i = 0; i < 18; i += 1) {
    const puff = new THREE.Mesh(shared.smokeGeometry, cloudMaterial.clone());
    puff.name = "intro-cloud-puff";
    puff.position.set(
      -3.18 + THREE.MathUtils.randFloatSpread(1.08),
      3.08 + THREE.MathUtils.randFloatSpread(0.5),
      0.08 + THREE.MathUtils.randFloatSpread(0.78),
    );
    puff.scale.set(
      THREE.MathUtils.randFloat(0.34, 0.82),
      THREE.MathUtils.randFloat(0.18, 0.42),
      THREE.MathUtils.randFloat(0.3, 0.72),
    );
    puff.userData.base = puff.position.clone();
    puff.userData.phase = Math.random() * TAU;
    cloudGroup.add(puff);
    cloudPuffs.push(puff);
  }

  const man = new THREE.Group();
  man.name = "intro-man";
  man.position.set(2.45, 0.5, -0.25);
  group.add(man);

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.5, 1.1, 18), shirtMaterial);
  body.position.y = -0.45;
  man.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 16), skinMaterial);
  head.name = "intro-man-head";
  head.position.set(0.12, 0.36, 0);
  man.add(head);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.26, 16), skinMaterial);
  neck.position.set(0.08, -0.02, 0);
  man.add(neck);

  const jaw = new THREE.Mesh(new THREE.SphereGeometry(0.22, 18, 12), skinMaterial);
  jaw.position.set(0.08, 0.16, 0.05);
  jaw.scale.set(1.12, 0.58, 0.86);
  man.add(jaw);

  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.355, 24, 12, 0, TAU, 0, Math.PI * 0.58),
    new THREE.MeshStandardMaterial({ color: 0x20140d, roughness: 0.78 }),
  );
  hair.position.set(0.1, 0.51, -0.02);
  hair.rotation.x = -0.16;
  man.add(hair);

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), skinMaterial);
  nose.position.set(-0.15, 0.34, 0.28);
  nose.scale.set(0.85, 0.7, 1.35);
  man.add(nose);

  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 8), skinMaterial);
    ear.position.set(0.15 + side * 0.28, 0.34, -0.03);
    ear.scale.set(0.55, 1, 0.32);
    man.add(ear);

    const eye = new THREE.Mesh(shared.monsterEyeGeometry, shared.dark);
    eye.position.set(-0.06 + side * 0.11, 0.4, 0.29);
    eye.scale.set(0.9, 0.5, 0.45);
    man.add(eye);

    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.018, 0.018), shared.dark);
    brow.position.set(-0.06 + side * 0.11, 0.47, 0.295);
    brow.rotation.z = side * 0.16;
    man.add(brow);
  }

  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.026, 0.018), shared.dark);
  mouth.position.set(-0.08, 0.23, 0.305);
  mouth.rotation.z = -0.08;
  man.add(mouth);

  const shoulderBar = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.18, 0.34), shirtMaterial);
  shoulderBar.position.set(0, -0.08, 0);
  shoulderBar.rotation.z = -0.05;
  man.add(shoulderBar);

  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 1.2, 12), skinMaterial);
  arm.name = "intro-man-arm";
  arm.position.set(-0.56, -0.06, 0.03);
  arm.rotation.z = 1.03;
  man.add(arm);

  const hand = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 10), skinMaterial);
  hand.name = "intro-man-hand";
  hand.position.set(-1.02, 0.25, 0.07);
  hand.scale.set(1.25, 0.72, 0.82);
  man.add(hand);

  for (let i = 0; i < 4; i += 1) {
    const finger = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.023, 0.24, 8), skinMaterial);
    finger.position.set(-1.12 + i * 0.055, 0.26 - i * 0.012, 0.16);
    finger.rotation.x = Math.PI * 0.5;
    finger.rotation.z = -0.12 + i * 0.05;
    man.add(finger);
  }

  const cigarette = new THREE.Group();
  cigarette.name = "intro-cigarette";
  cigarette.position.set(0.15, 0.82, 0);
  group.add(cigarette);

  const paperTube = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 3.65, 32), paper);
  paperTube.name = "intro-cigarette-paper";
  paperTube.rotation.z = Math.PI * 0.5;
  cigarette.add(paperTube);

  const filterTip = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.185, 0.72, 24), filter);
  filterTip.name = "intro-cigarette-filter";
  filterTip.position.x = 1.82;
  filterTip.rotation.z = Math.PI * 0.5;
  cigarette.add(filterTip);

  const fireTip = new THREE.Mesh(shared.flameGeometry, shared.flameMaterial.clone());
  fireTip.name = "intro-cigarette-fire";
  fireTip.position.set(-1.94, 0.18, 0);
  fireTip.scale.set(0.28, 0.56, 0.28);
  cigarette.add(fireTip);

  const emberTip = new THREE.Mesh(shared.tobaccoClumpGeometry, ember);
  emberTip.name = "intro-cigarette-ember";
  emberTip.position.set(-1.92, 0, 0);
  emberTip.scale.setScalar(0.22);
  cigarette.add(emberTip);

  const openEnd = new THREE.Mesh(
    new THREE.TorusGeometry(0.2, 0.014, 8, 36),
    new THREE.MeshBasicMaterial({ color: 0x7c5732, transparent: true, opacity: 0.68 }),
  );
  openEnd.name = "intro-cigarette-open-end";
  openEnd.position.x = -1.88;
  openEnd.rotation.y = Math.PI * 0.5;
  cigarette.add(openEnd);

  const entryGlow = new THREE.Mesh(
    new THREE.TorusGeometry(0.225, 0.018, 8, 48),
    new THREE.MeshBasicMaterial({
      color: 0x8cecff,
      transparent: true,
      opacity: 0.54,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  entryGlow.name = "intro-cigarette-entry-glow";
  entryGlow.position.x = -1.88;
  entryGlow.rotation.y = Math.PI * 0.5;
  cigarette.add(entryGlow);

  const tunnelCutaway = new THREE.Mesh(
    new THREE.CylinderGeometry(0.205, 0.205, 2.5, 32, 1, true, 0, Math.PI * 1.55),
    new THREE.MeshBasicMaterial({
      color: 0xfff2d6,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  tunnelCutaway.name = "intro-cigarette-cutaway";
  tunnelCutaway.position.x = -0.35;
  tunnelCutaway.rotation.z = Math.PI * 0.5;
  cigarette.add(tunnelCutaway);

  const introFires = [];
  const introTars = [];
  for (let i = 0; i < 4; i += 1) {
    const pile = new THREE.Group();
    pile.name = "intro-inner-fire";
    pile.position.set(-0.9 + i * 0.62, -0.02, 0.19);
    const log = new THREE.Mesh(shared.tobaccoChunkGeometry, shared.tobaccoMaterial.clone());
    log.scale.set(0.32, 0.34, 0.32);
    log.rotation.z = 1.45;
    pile.add(log);
    const flame = new THREE.Mesh(shared.flameGeometry, shared.flameMaterial.clone());
    flame.position.y = 0.18;
    flame.scale.set(0.12, 0.3, 0.12);
    pile.add(flame);
    cigarette.add(pile);
    introFires.push(pile);
  }
  for (let i = 0; i < 2; i += 1) {
    const tar = new THREE.Mesh(
      new THREE.CircleGeometry(0.18, 16),
      new THREE.MeshBasicMaterial({ color: 0x090402, transparent: true, opacity: 0.86, side: THREE.DoubleSide }),
    );
    tar.name = "intro-inner-tar";
    tar.position.set(-0.45 + i * 0.76, -0.13, 0.19);
    tar.scale.set(1.8, 0.55, 1);
    cigarette.add(tar);
    introTars.push(tar);
  }

  const introRunTunnel = new THREE.Group();
  introRunTunnel.name = "intro-full-size-running-tunnel";
  introRunTunnel.visible = false;
  group.add(introRunTunnel);

  const runTunnelWall = new THREE.Mesh(
    new THREE.CylinderGeometry(INTRO_RUN_TUBE_RADIUS, INTRO_RUN_TUBE_RADIUS, INTRO_RUN_TUBE_LENGTH, 64, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xfffbef,
      transparent: true,
      opacity: 0.9,
      side: THREE.BackSide,
      depthWrite: false,
    }),
  );
  runTunnelWall.name = "intro-runner-paper-tunnel";
  runTunnelWall.position.copy(INTRO_RUN_CENTER);
  runTunnelWall.rotation.z = Math.PI * 0.5;
  introRunTunnel.add(runTunnelWall);

  const runTunnelRings = [];
  const introRingMaterial = new THREE.MeshBasicMaterial({
    color: 0xf2d7a6,
    transparent: true,
    opacity: 0.26,
    depthWrite: false,
  });
  for (let i = 0; i < 11; i += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(INTRO_RUN_TUBE_RADIUS, 0.01, 6, 72), introRingMaterial.clone());
    ring.name = "intro-runner-depth-ring";
    ring.position.copy(INTRO_RUN_CENTER).add(new THREE.Vector3(-3.3 + i * 0.66, 0, 0));
    ring.rotation.y = Math.PI * 0.5;
    introRunTunnel.add(ring);
    runTunnelRings.push(ring);
  }

  const introDropTube = new THREE.Group();
  introDropTube.name = "intro-upright-drop-cigarette-tube";
  introDropTube.position.set(-3.18, 1.05, 0.08);
  group.add(introDropTube);

  const dropTubeWall = new THREE.Mesh(
    new THREE.CylinderGeometry(INTRO_RUN_TUBE_RADIUS, INTRO_RUN_TUBE_RADIUS * 0.94, 2.55, 64, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xfffbef,
      transparent: true,
      opacity: 0.74,
      side: THREE.BackSide,
      depthWrite: false,
    }),
  );
  dropTubeWall.name = "intro-upright-tube-paper-wall";
  introDropTube.add(dropTubeWall);

  const dropTubeRim = new THREE.Mesh(
    new THREE.TorusGeometry(INTRO_RUN_TUBE_RADIUS, 0.06, 12, 96),
    new THREE.MeshStandardMaterial({
      color: 0xfff8e8,
      roughness: 0.8,
      side: THREE.DoubleSide,
    }),
  );
  dropTubeRim.name = "intro-upright-tube-open-rim";
  dropTubeRim.position.y = 1.28;
  dropTubeRim.rotation.x = Math.PI * 0.5;
  introDropTube.add(dropTubeRim);

  const dropTubeDepth = new THREE.Mesh(
    new THREE.CircleGeometry(INTRO_RUN_TUBE_RADIUS * 0.9, 64),
    new THREE.MeshBasicMaterial({
      color: 0x24150c,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  dropTubeDepth.name = "intro-upright-tube-dark-depth";
  dropTubeDepth.position.y = 1.23;
  dropTubeDepth.rotation.x = -Math.PI * 0.5;
  introDropTube.add(dropTubeDepth);

  const introTubeEntrance = new THREE.Group();
  introTubeEntrance.name = "intro-cigarette-3d-entrance";
  introTubeEntrance.position.copy(INTRO_RUN_CENTER).add(new THREE.Vector3(-3.62, 0, 0));
  introRunTunnel.add(introTubeEntrance);

  const entranceRim = new THREE.Mesh(
    new THREE.TorusGeometry(INTRO_RUN_TUBE_RADIUS, 0.055, 12, 96),
    new THREE.MeshStandardMaterial({
      color: 0xfff8e8,
      roughness: 0.82,
      side: THREE.DoubleSide,
    }),
  );
  entranceRim.name = "intro-cigarette-entrance-paper-rim";
  entranceRim.rotation.y = Math.PI * 0.5;
  introTubeEntrance.add(entranceRim);

  const entranceShadow = new THREE.Mesh(
    new THREE.CircleGeometry(INTRO_RUN_TUBE_RADIUS * 0.95, 64),
    new THREE.MeshBasicMaterial({
      color: 0x6f4a2a,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  entranceShadow.name = "intro-cigarette-entrance-depth";
  entranceShadow.rotation.y = Math.PI * 0.5;
  entranceShadow.position.x = 0.04;
  introTubeEntrance.add(entranceShadow);

  const introRunMouth = new THREE.Group();
  introRunMouth.name = "intro-runner-mouth-exit";
  introRunMouth.position.copy(INTRO_RUN_CENTER).add(new THREE.Vector3(4.62, 0, 0));
  introRunTunnel.add(introRunMouth);

  const faceDisc = new THREE.Mesh(
    new THREE.CircleGeometry(1.84, 64),
    new THREE.MeshStandardMaterial({
      color: 0xd9a47f,
      emissive: 0x3a140d,
      emissiveIntensity: 0.06,
      roughness: 0.66,
      side: THREE.DoubleSide,
    }),
  );
  faceDisc.name = "intro-mouth-face-area";
  faceDisc.position.x = 0.48;
  faceDisc.rotation.y = Math.PI * 0.5;
  faceDisc.scale.set(0.82, 1.08, 1);
  introRunMouth.add(faceDisc);

  const mouthDark = new THREE.Mesh(
    new THREE.CircleGeometry(1.06, 48),
    new THREE.MeshBasicMaterial({
      color: 0x170807,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  mouthDark.name = "intro-mouth-dark-opening";
  mouthDark.rotation.y = Math.PI * 0.5;
  introRunMouth.add(mouthDark);

  const lips = new THREE.Mesh(
    new THREE.TorusGeometry(1.08, 0.085, 12, 72),
    new THREE.MeshStandardMaterial({
      color: 0x9c4a42,
      emissive: 0x3c0e0b,
      emissiveIntensity: 0.12,
      roughness: 0.52,
    }),
  );
  lips.name = "intro-mouth-lips";
  lips.position.x = 0.06;
  lips.rotation.y = Math.PI * 0.5;
  lips.scale.set(1, 0.62, 1);
  introRunMouth.add(lips);

  const faceNose = new THREE.Mesh(new THREE.SphereGeometry(0.16, 18, 12), skinMaterial);
  faceNose.name = "intro-mouth-face-nose";
  faceNose.position.set(0.34, 0.54, 0.08);
  faceNose.scale.set(0.8, 1, 0.72);
  introRunMouth.add(faceNose);

  for (const side of [-1, 1]) {
    const faceEye = new THREE.Mesh(shared.monsterEyeGeometry, shared.dark);
    faceEye.name = side < 0 ? "intro-mouth-face-left-eye" : "intro-mouth-face-right-eye";
    faceEye.position.set(0.38, 0.86, side * 0.36);
    faceEye.scale.set(1.9, 1.15, 1.2);
    introRunMouth.add(faceEye);

    const cheek = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 10),
      new THREE.MeshStandardMaterial({
        color: 0xe4b08c,
        roughness: 0.7,
        transparent: true,
        opacity: 0.92,
      }),
    );
    cheek.name = side < 0 ? "intro-mouth-left-cheek" : "intro-mouth-right-cheek";
    cheek.position.set(0.4, 0.04, side * 0.62);
    cheek.scale.set(0.56, 0.76, 1);
    introRunMouth.add(cheek);
  }

  for (const y of [0.42, -0.42]) {
    const teeth = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.15, 0.78),
      new THREE.MeshStandardMaterial({ color: 0xfff1d8, roughness: 0.46 }),
    );
    teeth.name = y > 0 ? "intro-upper-teeth" : "intro-lower-teeth";
    teeth.position.set(-0.04, y, 0);
    teeth.rotation.y = Math.PI * 0.5;
    introRunMouth.add(teeth);
  }

  const introFilterWall = new THREE.Group();
  introFilterWall.name = "intro-white-filter-wall";
  introFilterWall.position.copy(INTRO_RUN_CENTER).add(new THREE.Vector3(3.36, 0, 0));
  introRunTunnel.add(introFilterWall);

  const filterWallDisc = new THREE.Mesh(
    new THREE.CircleGeometry(INTRO_RUN_TUBE_RADIUS * 0.86, 48),
    new THREE.MeshBasicMaterial({
      color: 0xfffbef,
      transparent: true,
      opacity: 0.94,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  filterWallDisc.name = "intro-filter-white-disc";
  filterWallDisc.rotation.y = Math.PI * 0.5;
  introFilterWall.add(filterWallDisc);
  introFilterWall.userData.disc = filterWallDisc;

  const filterFibers = [];
  const fiberMaterial = new THREE.MeshBasicMaterial({
    color: 0xd7cbb5,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  for (let i = 0; i < 18; i += 1) {
    const fiber = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.018, THREE.MathUtils.randFloat(0.24, 0.62)), fiberMaterial.clone());
    fiber.name = "intro-filter-fiber";
    fiber.position.set(0.006, THREE.MathUtils.randFloatSpread(1.6), THREE.MathUtils.randFloatSpread(1.6));
    fiber.rotation.set(Math.PI * 0.5, 0, Math.random() * TAU);
    introFilterWall.add(fiber);
    filterFibers.push(fiber);
  }
  introFilterWall.userData.fibers = filterFibers;

  const filterShards = [];
  const shardMaterial = new THREE.MeshBasicMaterial({
    color: 0xfffbef,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  for (let i = 0; i < 14; i += 1) {
    const shard = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.14, 0.28), shardMaterial.clone());
    shard.name = "intro-filter-burst-shard";
    const angle = (i / 14) * TAU;
    const radius = THREE.MathUtils.randFloat(0.16, 0.74);
    shard.position.set(0.02, Math.sin(angle) * radius, Math.cos(angle) * radius);
    shard.rotation.set(Math.random() * TAU, Math.random() * TAU, Math.random() * TAU);
    shard.userData.origin = shard.position.clone();
    shard.userData.velocity = new THREE.Vector3(
      THREE.MathUtils.randFloat(0.34, 1.15),
      Math.sin(angle) * THREE.MathUtils.randFloat(0.34, 1.05),
      Math.cos(angle) * THREE.MathUtils.randFloat(0.34, 1.05),
    );
    shard.visible = false;
    introFilterWall.add(shard);
    filterShards.push(shard);
  }
  introFilterWall.userData.shards = filterShards;

  const introRunFires = [];
  const runFireSpecs = [
    { x: -2.35, angle: -1.15, trigger: 0.16 },
    { x: -0.95, angle: 0.58, trigger: 0.38 },
    { x: 0.62, angle: 2.15, trigger: 0.6 },
    { x: 2.12, angle: 3.92, trigger: 0.82 },
  ];
  for (const spec of runFireSpecs) {
    const pile = new THREE.Group();
    pile.name = "intro-runner-burning-tobacco";
    pile.userData = { ...spec };

    const aura = new THREE.Mesh(
      new THREE.RingGeometry(0.26, 0.54, 36),
      shared.fireObjectiveAuraMaterial.clone(),
    );
    aura.name = "intro-blue-target-aura";
    aura.rotation.x = -Math.PI * 0.5;
    aura.position.y = 0.03;
    pile.add(aura);
    pile.userData.aura = aura;

    const log = new THREE.Mesh(shared.tobaccoChunkGeometry, shared.tobaccoMaterial.clone());
    log.name = "intro-runner-tobacco-log";
    log.position.y = 0.12;
    log.rotation.set(1.3, 0.25, 0.4);
    log.scale.set(0.52, 0.9, 0.52);
    pile.add(log);

    const flame = new THREE.Mesh(shared.flameGeometry, shared.flameMaterial.clone());
    flame.name = "intro-runner-fire";
    flame.position.y = 0.54;
    flame.scale.set(0.32, 0.86, 0.32);
    pile.add(flame);
    pile.userData.flame = flame;

    orientIntroWallGroup(pile, spec.x, spec.angle, 0.03);
    introRunTunnel.add(pile);
    introRunFires.push(pile);
  }

  const introRunTars = [];
  for (const spec of [
    { x: -1.62, angle: 2.62 },
    { x: 1.36, angle: -0.35 },
  ]) {
    const tar = new THREE.Mesh(
      new THREE.CircleGeometry(0.52, 26),
      new THREE.MeshBasicMaterial({
        color: 0x090402,
        transparent: true,
        opacity: 0.78,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    tar.name = "intro-runner-tar-pool";
    tar.rotation.x = -Math.PI * 0.5;
    tar.scale.set(1.6, 0.72, 1);
    tar.userData = { ...spec };
    const holder = new THREE.Group();
    holder.name = "intro-runner-tar-holder";
    holder.userData = { ...spec };
    holder.add(tar);
    orientIntroWallGroup(holder, spec.x, spec.angle, 0.025);
    introRunTunnel.add(holder);
    introRunTars.push(holder);
  }

  const introRunHands = [];
  for (const spec of [
    { x: -0.12, angle: -2.05, trigger: 0.48 },
    { x: 1.76, angle: 1.2, trigger: 0.73 },
  ]) {
    const handRoot = new THREE.Group();
    handRoot.name = "intro-runner-reaching-hand";
    handRoot.userData = { ...spec };

    const wrist = new THREE.Mesh(shared.handWristGeometry, shared.handMaterial.clone());
    wrist.name = "intro-runner-hand-wrist";
    wrist.position.y = 0.22;
    wrist.scale.setScalar(0.42);
    handRoot.add(wrist);

    const palm = new THREE.Mesh(shared.handPalmGeometry, shared.handPalmMaterial.clone());
    palm.name = "intro-runner-hand-palm";
    palm.position.y = 0.68;
    palm.scale.set(0.46, 0.62, 0.22);
    handRoot.add(palm);
    handRoot.userData.palm = palm;

    for (let f = 0; f < 5; f += 1) {
      const side = f - 2;
      const finger = new THREE.Mesh(shared.handFingerGeometry, shared.handPalmMaterial.clone());
      finger.position.set(side * 0.11, 1.04 - Math.abs(side) * 0.035, 0);
      finger.rotation.z = side * 0.11;
      finger.scale.set(0.42, f === 2 ? 0.52 : 0.43, 0.42);
      handRoot.add(finger);
    }

    orientIntroWallGroup(handRoot, spec.x, spec.angle, 0.02);
    introRunTunnel.add(handRoot);
    introRunHands.push(handRoot);
  }

  const introHands = [];
  for (let i = 0; i < 2; i += 1) {
    const handRoot = new THREE.Group();
    handRoot.name = "intro-nicotine-hand";
    handRoot.position.set(-0.18 + i * 0.92, -0.11, 0.18);
    handRoot.rotation.set(-0.18, 0.22 - i * 0.38, -0.2 + i * 0.34);
    handRoot.scale.setScalar(0.28);
    handRoot.userData.baseX = handRoot.position.x;
    handRoot.userData.baseRotationZ = handRoot.rotation.z;

    const wrist = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.18, 0.62, 18),
      shared.handMaterial.clone(),
    );
    wrist.name = "intro-hand-wrist";
    wrist.position.y = -0.02;
    handRoot.add(wrist);

    const palm = new THREE.Mesh(shared.handPalmGeometry, shared.handPalmMaterial.clone());
    palm.name = "intro-hand-palm";
    palm.position.y = 0.44;
    palm.scale.set(0.72, 0.9, 0.32);
    handRoot.add(palm);

    for (let f = 0; f < 5; f += 1) {
      const finger = new THREE.Mesh(shared.handFingerGeometry, shared.handPalmMaterial.clone());
      const side = f - 2;
      finger.name = "intro-hand-finger";
      finger.position.set(side * 0.13, 0.9 + Math.abs(side) * -0.04, 0.02);
      finger.rotation.z = side * 0.1;
      finger.scale.set(0.72, f === 2 ? 0.58 : 0.48, 0.72);
      handRoot.add(finger);

      const tip = new THREE.Mesh(shared.handFingerTipGeometry, shared.handPalmMaterial.clone());
      tip.position.set(side * 0.13, 1.17 + Math.abs(side) * -0.05, 0.02);
      tip.scale.setScalar(0.5);
      handRoot.add(tip);
    }

    cigarette.add(handRoot);
    introHands.push(handRoot);
  }

  const introSprays = [];
  for (let i = 0; i < 4; i += 1) {
    const spray = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.065, 1, 10),
      shared.waterSprayMaterial.clone(),
    );
    spray.name = "intro-extinguish-water-jet";
    spray.visible = false;
    group.add(spray);
    introSprays.push(spray);
  }

  const dashTrails = [];
  for (let i = 0; i < 5; i += 1) {
    const trail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.045, 1, 8),
      shared.dashTrailMaterial.clone(),
    );
    trail.name = "intro-droplet-speed-trail";
    trail.visible = false;
    group.add(trail);
    dashTrails.push(trail);
  }

  const droplet = createIntroDroplet();
  droplet.name = "intro-droplet";
  group.add(droplet);

  const splashBits = [];
  for (let i = 0; i < 22; i += 1) {
    const bit = new THREE.Mesh(shared.waterDropletGeometry, shared.splashMaterial.clone());
    bit.name = "intro-face-splash";
    bit.userData.origin = new THREE.Vector3(5.08, 1.22, 1.18);
    bit.userData.velocity = new THREE.Vector3(
      THREE.MathUtils.randFloat(0.08, 0.48),
      THREE.MathUtils.randFloat(-0.42, 0.78),
      THREE.MathUtils.randFloatSpread(1.28),
    );
    bit.scale.setScalar(0.045 + Math.random() * 0.035);
    group.add(bit);
    splashBits.push(bit);
  }

  group.userData = {
    man,
    arm,
    hand,
    cigarette,
    fireTip,
    emberTip,
    entryGlow,
    cloudGroup,
    cloudPuffs,
    introRunTunnel,
    introDropTube,
    introTubeEntrance,
    introRunFires,
    introRunTars,
    introRunHands,
    introRunMouth,
    introFilterWall,
    runTunnelRings,
    introFires,
    introTars,
    introHands,
    introSprays,
    dashTrails,
    droplet,
    splashBits,
    cameraPos: new THREE.Vector3(0, 1.4, 5),
    cameraTarget: new THREE.Vector3(0, 0.8, 0),
    cameraFov: 68,
    time: 0,
  };

  return group;
}

function createIntroDroplet() {
  const group = new THREE.Group();
  const rig = {
    arms: [],
    legs: [],
  };

  const body = new THREE.Mesh(shared.monsterBodyGeometry, shared.waterMonsterMaterial.clone());
  body.name = "intro-drop-body";
  body.scale.set(0.46, 0.5, 0.36);
  group.add(body);
  rig.body = body;

  const rim = new THREE.Mesh(shared.monsterBodyGeometry, shared.waterOutlineMaterial.clone());
  rim.name = "intro-drop-rim";
  rim.scale.set(0.49, 0.53, 0.39);
  group.add(rim);
  rig.rim = rim;

  const highlight = new THREE.Mesh(shared.monsterHeadGeometry, shared.waterBellyMaterial.clone());
  highlight.name = "intro-drop-highlight";
  highlight.position.set(-0.11, 0.18, 0.24);
  highlight.scale.set(0.34, 0.22, 0.07);
  highlight.rotation.z = -0.34;
  group.add(highlight);
  rig.highlight = highlight;

  for (const side of [-1, 1]) {
    const armRoot = new THREE.Group();
    armRoot.name = side < 0 ? "intro-left-arm-rig" : "intro-right-arm-rig";
    armRoot.position.set(side * 0.31, 0.03, 0.04);
    group.add(armRoot);

    const arm = new THREE.Mesh(shared.dropLimbGeometry, shared.waterFinMaterial.clone());
    arm.name = side < 0 ? "intro-left-arm" : "intro-right-arm";
    arm.position.y = -0.23;
    arm.scale.set(0.72, 0.48, 0.72);
    armRoot.add(arm);
    rig.arms.push({ side, root: armRoot, limb: arm });

    const legRoot = new THREE.Group();
    legRoot.name = side < 0 ? "intro-left-leg-rig" : "intro-right-leg-rig";
    legRoot.position.set(side * 0.16, -0.38, 0);
    group.add(legRoot);

    const leg = new THREE.Mesh(shared.dropLimbGeometry, shared.waterFinMaterial.clone());
    leg.name = side < 0 ? "intro-left-leg" : "intro-right-leg";
    leg.position.y = -0.27;
    leg.scale.set(0.78, 0.58, 0.78);
    legRoot.add(leg);
    rig.legs.push({ side, root: legRoot, limb: leg });
  }

  group.userData.rig = rig;
  animateIntroDropletRig(group, "fall", 0, 0);

  return group;
}

function animateIntroDropletRig(drop, mode, phase = 0, intensity = 1) {
  const rig = drop.userData.rig;
  if (!rig) return;

  const wave = Math.sin(phase * TAU);
  const counter = Math.sin(phase * TAU + Math.PI);
  const bounce = Math.abs(Math.sin(phase * TAU));
  const squash = mode === "idle"
    ? bounce * 0.026 * intensity
    : mode === "run" || mode === "sprayRun" || mode === "dodgeRun"
    ? bounce * 0.018 * intensity
    : mode === "splash"
    ? 0.14 * intensity
    : 0;

  rig.body.scale.set(0.46 * (1 + squash * 0.55), 0.5 * (1 - squash), 0.36 * (1 + squash * 0.34));
  rig.rim.scale.set(0.49 * (1 + squash * 0.55), 0.53 * (1 - squash), 0.39 * (1 + squash * 0.34));
  rig.highlight.position.set(-0.11, 0.18 + squash * 0.2, 0.24);
  rig.highlight.scale.set(0.34 * (1 + squash * 0.3), 0.22 * (1 - squash * 0.2), 0.07);

  for (const arm of rig.arms) {
    const side = arm.side;
    arm.root.position.set(side * 0.31, 0.03, 0.04);
    arm.root.rotation.set(0, 0, side * 0.88);
    arm.limb.scale.set(0.72, 0.48, 0.72);

    if (mode === "idle") {
      arm.root.position.y += Math.sin(phase * TAU + side) * 0.018;
      arm.root.rotation.set(
        -0.08 + wave * 0.04,
        side * 0.04,
        side * (1.08 + Math.sin(phase * TAU * 0.7 + side) * 0.08),
      );
    } else if (mode === "fall") {
      const flap = Math.sin(phase * TAU * 1.4 + side);
      arm.root.rotation.set(-0.88 + flap * 0.18, 0.08 * side, side * (1.28 + flap * 0.2));
    } else if (mode === "dive") {
      arm.root.rotation.set(-1.42, 0.08 * side, side * 0.18);
      arm.root.position.z += 0.08;
    } else if (mode === "run" || mode === "sprayRun" || mode === "dodgeRun") {
      const swing = side < 0 ? wave : counter;
      const attack = mode === "sprayRun" ? 1 : 0;
      const dodge = mode === "dodgeRun" ? side * 0.2 : 0;
      arm.root.rotation.set(
        swing * 0.46 - attack * 0.52,
        dodge,
        side * (0.56 - attack * 0.34) + swing * 0.04,
      );
      arm.limb.scale.set(0.72 + attack * 0.06, 0.5, 0.72 + attack * 0.04);
    } else if (mode === "leap") {
      arm.root.rotation.set(-0.96 + side * 0.12, 0, side * 1.18);
    } else if (mode === "splash") {
      arm.root.rotation.set(-0.18, 0, side * 1.64);
      arm.limb.scale.set(0.86, 0.5, 0.86);
    }
  }

  for (const leg of rig.legs) {
    const side = leg.side;
    leg.root.position.set(side * 0.16, -0.38, 0);
    leg.root.rotation.set(0, 0, side * 0.14);
    leg.limb.scale.set(0.78, 0.58, 0.78);
    leg.limb.position.set(0, -0.27, 0);

    if (mode === "idle") {
      leg.root.position.y = -0.38 + Math.sin(phase * TAU * 0.85 + side) * 0.012;
      leg.root.rotation.set(0.06 + counter * 0.035, 0, side * (0.18 + bounce * 0.04));
      leg.limb.position.y = -0.27;
      leg.limb.scale.set(0.78, 0.58, 0.78);
    } else if (mode === "fall") {
      const kick = Math.sin(phase * TAU * 1.2 + side * 0.7);
      leg.root.rotation.set(0.68 + kick * 0.18, 0, side * 0.28);
    } else if (mode === "dive") {
      leg.root.rotation.set(0.32, 0, side * 0.1);
      leg.limb.position.z = -0.02;
    } else if (mode === "run" || mode === "sprayRun" || mode === "dodgeRun") {
      const stride = side < 0 ? counter : wave;
      const lift = Math.max(0, stride);
      const pushBack = Math.max(0, -stride);
      const dodge = mode === "dodgeRun" ? side * 0.1 : 0;
      leg.root.rotation.set(-stride * 0.58 + dodge, 0, side * (0.1 + lift * 0.06));
      leg.root.position.y = -0.38 + lift * 0.08 - pushBack * 0.02;
      leg.root.position.z = pushBack * 0.12 - lift * 0.05;
      leg.limb.position.y = -0.28 - pushBack * 0.04 + lift * 0.025;
      leg.limb.scale.set(0.82, 0.62, 0.82);
    } else if (mode === "leap") {
      leg.root.rotation.set(0.7, 0, side * 0.24);
      leg.limb.position.y = -0.22;
    } else if (mode === "splash") {
      leg.root.rotation.set(0.2, 0, side * 0.86);
      leg.limb.scale.set(0.94, 0.58, 0.94);
    }
  }
}

function updateIntroAnimation(dt) {
  const data = introStage.userData;
  if (!data || !data.droplet) return;

  data.time = (data.time + dt) % INTRO_LOOP_DURATION;
  const idlePhase = data.time * 0.42;
  const idleBob = Math.sin(idlePhase * TAU) * 0.045;
  const idleX = -1.08;
  const idleDrop = data.droplet;

  data.man.visible = false;
  data.cigarette.visible = false;
  if (data.cloudGroup) data.cloudGroup.visible = false;
  if (data.introDropTube) data.introDropTube.visible = false;
  if (data.introRunTunnel) data.introRunTunnel.visible = true;
  if (data.introTubeEntrance) {
    data.introTubeEntrance.visible = true;
    data.introTubeEntrance.scale.setScalar(1 + Math.sin(data.time * 1.8) * 0.01);
  }
  if (data.introRunMouth) data.introRunMouth.visible = false;
  if (data.introFilterWall) data.introFilterWall.visible = false;

  for (const ring of data.runTunnelRings || []) {
    ring.material.opacity = 0.16 + Math.sin(data.time * 1.1 + ring.position.x) * 0.025;
  }
  for (const collection of [
    data.introFires,
    data.introTars,
    data.introHands,
    data.introRunFires,
    data.introRunTars,
    data.introRunHands,
    data.introSprays,
    data.dashTrails,
    data.splashBits,
  ]) {
    for (const item of collection || []) item.visible = false;
  }

  idleDrop.visible = true;
  idleDrop.position.set(idleX, INTRO_RUN_CENTER.y + idleBob, INTRO_RUN_CENTER.z);
  idleDrop.quaternion.setFromEuler(new THREE.Euler(0, -Math.PI * 0.5, Math.sin(data.time * 1.25) * 0.035));
  idleDrop.scale.setScalar(1.12 + Math.sin(data.time * 1.6) * 0.018);
  animateIntroDropletRig(idleDrop, "idle", idlePhase, 1);

  data.cameraPos.set(-5.45, INTRO_RUN_CENTER.y + 0.16, INTRO_RUN_CENTER.z + 0.04);
  data.cameraTarget.set(idleX, INTRO_RUN_CENTER.y + 0.02, INTRO_RUN_CENTER.z);
  data.cameraFov = 54;
  data.cameraUp = LOCAL_UP.clone();
  return;

  const t = data.time / INTRO_LOOP_DURATION;
  const descentActive = t < 0.26 || t > 0.97;
  const entryActive = t >= 0.26 && t < 0.36;
  const insideActive = t >= 0.36 && t < 0.8;
  const exitActive = t >= 0.8 && t < 0.93;
  const splatActive = t >= 0.93;
  data.man.visible = false;
  data.cigarette.visible = false;
  data.introRunTunnel.visible = t >= 0.22 && t < 0.97;
  if (data.introDropTube) {
    data.introDropTube.visible = descentActive || entryActive;
    const dropTubePulse = 1 + Math.sin(data.time * 3.6) * 0.012;
    data.introDropTube.scale.set(dropTubePulse, 1, dropTubePulse);
  }

  data.cigarette.rotation.z = Math.sin(t * TAU) * 0.035;
  data.cigarette.position.y = 0.82 + Math.sin(t * TAU * 1.2) * 0.025;
  data.arm.rotation.z = 1.03 + Math.sin(t * TAU) * 0.12;
  data.hand.position.y = 0.25 + Math.sin(t * TAU) * 0.035;

  if (data.cloudGroup) {
    data.cloudGroup.visible = descentActive;
    for (const puff of data.cloudPuffs || []) {
      puff.position.copy(puff.userData.base);
      puff.position.x += Math.sin(data.time * 0.55 + puff.userData.phase) * 0.08;
      puff.position.y += Math.cos(data.time * 0.48 + puff.userData.phase) * 0.04;
      puff.material.opacity = THREE.MathUtils.lerp(puff.material.opacity, t > 0.97 ? 0.38 : 0.72, 0.05);
    }
  }

  const firePulse = 0.74 + Math.sin(data.time * 7.2) * 0.26;
  data.fireTip.visible = t < 0.34 || exitActive;
  data.fireTip.scale.set(0.28 * firePulse, 0.56 * firePulse, 0.28 * firePulse);
  data.emberTip.material.emissiveIntensity = t < 0.34 ? 1 + firePulse * 0.8 : 0.12;
  if (data.entryGlow) {
    data.entryGlow.visible = entryActive;
    const glowPulse = 1 + Math.sin(data.time * 12) * 0.15;
    data.entryGlow.scale.setScalar(glowPulse);
    data.entryGlow.material.opacity = entryActive ? 0.48 + Math.sin(data.time * 10) * 0.16 : 0;
  }

  const drop = data.droplet;
  drop.visible = true;
  const cameraUp = new THREE.Vector3(0, 1, 0);
  let cameraPos = data.cameraPos.clone();
  let cameraTarget = data.cameraTarget.clone();
  let cameraFov = 72;
  let travelDirection = new THREE.Vector3(1, -0.8, -0.2).normalize();

  if (t < 0.26) {
    const u = THREE.MathUtils.smoothstep(t / 0.26, 0, 1);
    const runStart = getIntroRunFrame(-3.18, Math.PI * 0.5, 0.42).root;
    const drift = Math.sin(u * Math.PI * 2.2) * 0.035;
    drop.position.set(
      runStart.x + drift,
      THREE.MathUtils.lerp(4.18, runStart.y, u),
      runStart.z + Math.sin(u * Math.PI * 1.5) * 0.035,
    );
    travelDirection = new THREE.Vector3(0, -1, 0).normalize();
    drop.scale.setScalar(0.82 + Math.sin(u * Math.PI) * 0.09);
    drop.quaternion.setFromEuler(new THREE.Euler(-0.18 - u * 0.22, 0, Math.sin(u * Math.PI) * 0.08));
    animateIntroDropletRig(drop, "fall", data.time * 0.85 + u, 1);
    cameraPos = drop.position.clone()
      .add(new THREE.Vector3(0, 1.05, 2.75 - u * 0.62));
    cameraTarget = new THREE.Vector3(runStart.x, runStart.y - 0.68, runStart.z);
    cameraFov = 88 + u * 7;
  } else if (t < 0.36) {
    const u = THREE.MathUtils.smoothstep((t - 0.26) / 0.1, 0, 1);
    const runStart = getIntroRunFrame(-3.18, Math.PI * 0.5, 0.42).root;
    const tubeForward = runStart.clone().add(new THREE.Vector3(0.82, 0, 0));
    drop.position.copy(runStart).lerp(tubeForward, u);
    travelDirection = new THREE.Vector3(1, 0, 0);
    drop.scale.setScalar(0.82 - u * 0.42);
    const entryFrame = getIntroRunFrame(THREE.MathUtils.lerp(-3.18, -2.36, u), Math.PI * 0.5, 0.42);
    const entryBasis = new THREE.Matrix4().makeBasis(entryFrame.right, entryFrame.inward, entryFrame.forward);
    drop.quaternion.setFromRotationMatrix(entryBasis);
    animateIntroDropletRig(drop, "dive", data.time * 1.2 + u, 1);
    cameraPos = drop.position.clone()
      .add(new THREE.Vector3(-0.9, 0.22, 0.48));
    cameraTarget = drop.position.clone().addScaledVector(travelDirection, 1.05);
    cameraUp.copy(entryFrame.inward);
    cameraFov = 76 + u * 16;
  } else if (insideActive) {
    const u = (t - 0.36) / 0.44;
    const x = THREE.MathUtils.lerp(-3.18, 3.18, u);
    const angle = Math.PI * 0.5 + u * TAU * 1.72 + Math.sin(u * TAU * 3.1) * 0.2;
    const frame = getIntroRunFrame(x, angle, 0.42);
    const basis = new THREE.Matrix4().makeBasis(frame.right, frame.inward, frame.forward);
    drop.position.copy(frame.root);
    drop.quaternion.setFromRotationMatrix(basis);
    drop.rotateZ(Math.sin(data.time * 5.5) * 0.025);
    drop.scale.setScalar(0.62);
    travelDirection = frame.forward.clone().addScaledVector(frame.right, Math.cos(u * TAU * 2.7) * 0.12).normalize();
    cameraUp.copy(frame.inward);
    const nearFire = (data.introRunFires || []).some((pile) => Math.abs(u - pile.userData.trigger) < 0.08);
    const nearHand = (data.introRunHands || []).some((hand) => Math.abs(u - hand.userData.trigger) < 0.1);
    animateIntroDropletRig(drop, nearFire ? "sprayRun" : nearHand ? "dodgeRun" : "run", data.time * 2.75, 1);
    cameraPos = drop.position.clone()
      .addScaledVector(frame.forward, -1.34)
      .addScaledVector(frame.inward, 0.44)
      .addScaledVector(frame.right, -0.12);
    cameraTarget = drop.position.clone()
      .addScaledVector(frame.forward, 1.72)
      .addScaledVector(frame.inward, 0.08)
      .addScaledVector(frame.right, Math.sin(u * TAU * 2.1) * 0.22);
    cameraFov = 92 + Math.sin(u * Math.PI) * 8;
  } else if (exitActive) {
    const u = THREE.MathUtils.smoothstep((t - 0.8) / 0.13, 0, 1);
    drop.position.set(
      THREE.MathUtils.lerp(3.18, 5.08, u),
      THREE.MathUtils.lerp(0.86, 1.22, u) + Math.sin(u * Math.PI) * 0.18,
      THREE.MathUtils.lerp(0.08, 1.18, u),
    );
    travelDirection = new THREE.Vector3(1, 0.08, 0.08).normalize();
    drop.scale.setScalar(0.6 + u * 0.28);
    drop.quaternion.setFromEuler(new THREE.Euler(0, Math.PI * 0.5, u * 0.22));
    animateIntroDropletRig(drop, "leap", data.time * 1.1 + u, 1);
    cameraPos = drop.position.clone().add(new THREE.Vector3(-1.55, 0.28, 0.58));
    cameraTarget = drop.position.clone().add(new THREE.Vector3(1.1, 0.02, 0.02));
    cameraFov = 78;
  } else {
    const u = THREE.MathUtils.smoothstep((t - 0.93) / 0.07, 0, 1);
    drop.position.set(
      5.08 + u * 0.02,
      1.22 - u * 0.04,
      1.18 + Math.sin(u * Math.PI) * 0.04,
    );
    drop.scale.set(0.9 + u * 0.28, 0.34 - u * 0.06, 0.9 + u * 0.18);
    drop.quaternion.setFromEuler(new THREE.Euler(0, Math.PI * 0.5, 0));
    animateIntroDropletRig(drop, "splash", data.time * 0.8 + u, 1);
    cameraPos = new THREE.Vector3(2.2, 1.4, 2.65);
    cameraTarget = new THREE.Vector3(5.1, 1.08, 0.45);
    cameraFov = 66;
  }

  const insideT = insideActive ? (t - 0.36) / 0.44 : 0;
  for (const [i, pile] of data.introFires.entries()) {
    pile.visible = entryActive;
    const extinguish = THREE.MathUtils.clamp((t - 0.3) / 0.08, 0, 1);
    const pilePulse = 1 + Math.sin(data.time * 9 + i) * 0.08;
    pile.scale.setScalar(pilePulse * (1 - extinguish * 0.22));
    const flame = pile.children[1];
    if (flame) {
      flame.visible = extinguish < 0.95;
      flame.scale.set(0.12 * (1 - extinguish * 0.86), 0.3 * (1 - extinguish * 0.8), 0.12);
      flame.material.opacity = 0.94 * (1 - extinguish);
    }
  }
  for (const tar of data.introTars) {
    tar.visible = entryActive;
    tar.material.opacity = 0.68 + Math.sin(data.time * 5.5 + tar.position.x) * 0.12;
  }

  for (const [i, hand] of (data.introHands || []).entries()) {
    hand.visible = entryActive;
    const reach = entryActive ? THREE.MathUtils.clamp(1 - Math.abs(t - (0.3 + i * 0.02)) * 18, 0, 1) : 0;
    hand.position.x = hand.userData.baseX + Math.sin(data.time * 3.2 + i) * 0.02;
    hand.position.y = -0.11 + reach * 0.2;
    hand.rotation.z = hand.userData.baseRotationZ + Math.sin(data.time * 4.4 + i) * 0.18 + reach * (i === 0 ? 0.34 : -0.3);
    hand.rotation.y = 0.22 - i * 0.38 + Math.sin(data.time * 2.2 + i) * 0.12;
    hand.scale.setScalar(0.28 + reach * 0.08);
  }

  for (const [i, ring] of (data.runTunnelRings || []).entries()) {
    ring.material.opacity = insideActive ? 0.14 + Math.sin(data.time * 5 + i) * 0.04 : 0;
  }
  if (data.introTubeEntrance) {
    const entrancePulse = 1 + Math.sin(data.time * 4.5) * 0.02;
    data.introTubeEntrance.visible = descentActive || entryActive || insideActive;
    data.introTubeEntrance.scale.setScalar(entrancePulse);
  }
  if (data.introRunMouth) {
    const mouthPulse = 1 + Math.sin(data.time * 7.4) * 0.035;
    data.introRunMouth.visible = insideActive || exitActive || splatActive;
    data.introRunMouth.scale.set(mouthPulse, 0.96 + (mouthPulse - 1) * 1.6, mouthPulse);
  }
  if (data.introFilterWall) {
    const burst = THREE.MathUtils.clamp((t - 0.81) / 0.13, 0, 1);
    const preBurst = 1 - burst;
    data.introFilterWall.visible = insideActive || exitActive || splatActive;
    data.introFilterWall.userData.disc.visible = preBurst > 0.04;
    data.introFilterWall.userData.disc.material.opacity = 0.94 * preBurst;
    for (const fiber of data.introFilterWall.userData.fibers || []) {
      fiber.visible = preBurst > 0.04;
      fiber.material.opacity = 0.58 * preBurst;
    }
    for (const shard of data.introFilterWall.userData.shards || []) {
      shard.visible = burst > 0.02 && burst < 0.98;
      shard.position.copy(shard.userData.origin).addScaledVector(shard.userData.velocity, burst);
      shard.rotation.x += dt * (2.5 + burst * 7);
      shard.rotation.y += dt * (1.6 + burst * 6);
      shard.material.opacity = 0.92 * (1 - burst * 0.72);
    }
  }
  for (const pile of data.introRunFires || []) {
    const trigger = pile.userData.trigger;
    const extinguish = insideActive ? THREE.MathUtils.clamp((insideT - trigger) / 0.12, 0, 1) : 0;
    const glowPulse = 1 + Math.sin(data.time * 8.5 + trigger * 10) * 0.12;
    pile.visible = insideActive;
    if (pile.userData.flame) {
      pile.userData.flame.visible = extinguish < 0.98;
      pile.userData.flame.scale.set(
        0.32 * (1 - extinguish * 0.82) * glowPulse,
        0.86 * (1 - extinguish * 0.76) * glowPulse,
        0.32 * (1 - extinguish * 0.82),
      );
      pile.userData.flame.material.opacity = 0.9 * (1 - extinguish);
    }
    if (pile.userData.aura) {
      pile.userData.aura.material.opacity = (0.2 + Math.sin(data.time * 7.2 + trigger) * 0.08) * (1 - extinguish * 0.45);
      pile.userData.aura.rotation.z += dt * 0.8;
      pile.userData.aura.scale.setScalar(glowPulse);
    }
  }
  for (const tar of data.introRunTars || []) {
    tar.visible = insideActive;
    const mesh = tar.children[0];
    if (mesh) mesh.material.opacity = 0.68 + Math.sin(data.time * 5.4 + tar.userData.x) * 0.12;
  }
  for (const hand of data.introRunHands || []) {
    hand.visible = insideActive;
    const reach = insideActive ? THREE.MathUtils.clamp(1 - Math.abs(insideT - hand.userData.trigger) * 8.5, 0, 1) : 0;
    const lean = Math.sin(data.time * 4 + hand.userData.trigger * 8) * 0.12;
    orientIntroWallGroup(hand, hand.userData.x, hand.userData.angle + lean, 0.02);
    hand.position.add(getIntroRunFrame(hand.userData.x, hand.userData.angle, 0).inward.multiplyScalar(reach * 0.34));
    hand.scale.setScalar(1 + reach * 0.22);
    if (hand.userData.palm) hand.userData.palm.position.y = 0.68 + reach * 0.3;
  }

  introStage.updateMatrixWorld(true);
  for (const [i, spray] of (data.introSprays || []).entries()) {
    const pile = insideActive ? data.introRunFires[i] : data.introFires[i];
    const trigger = pile?.userData?.trigger ?? (i * 0.28 + 0.2);
    const sprayWindow = insideActive
      ? Math.abs(insideT - trigger) < 0.08
      : entryActive && Math.abs(t - 0.31) < 0.045 && i === 0;
    spray.visible = sprayWindow;
    if (sprayWindow && pile) {
      const target = new THREE.Vector3();
      pile.getWorldPosition(target);
      const start = drop.position.clone().add(new THREE.Vector3(0.1, 0.03, 0.04));
      placeCylinderBetween(spray, start, target, 0.035 + i * 0.006);
      spray.material.opacity = 0.52 + Math.sin(data.time * 18 + i) * 0.18;
    }
  }

  const trailActive = t > 0.11 && t < 0.9 && data.droplet.visible;
  for (const [i, trail] of (data.dashTrails || []).entries()) {
    const visible = trailActive && (t < 0.36 || insideActive || exitActive);
    trail.visible = visible;
    if (!visible) continue;
    const fade = 1 - i / Math.max(1, data.dashTrails.length);
    const start = drop.position.clone().add(new THREE.Vector3(-0.05 * i, -0.01 * i, -0.02 * i));
    const end = start.clone().addScaledVector(travelDirection, -0.44 - i * 0.14);
    end.y += Math.sin(data.time * 6 + i) * 0.04;
    placeCylinderBetween(trail, start, end, 0.026 * fade);
    trail.material.opacity = 0.14 + fade * 0.22;
  }

  const splashStart = 0.91;
  for (const bit of data.splashBits) {
    const u = THREE.MathUtils.clamp((t - splashStart) / 0.16, 0, 1);
    bit.visible = u > 0 && u < 1;
    bit.position.copy(bit.userData.origin).addScaledVector(bit.userData.velocity, u);
    bit.position.y -= u * u * 0.62;
    bit.material.opacity = (1 - u) * 0.82;
    bit.scale.setScalar((0.045 + bit.userData.velocity.length() * 0.006) * (1 + u * 1.6));
  }

  data.cameraPos.copy(cameraPos);
  data.cameraTarget.copy(cameraTarget);
  data.cameraFov = cameraFov;
  data.cameraUp = cameraUp;
}

function createRunner() {
  const rig = new THREE.Group();

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.56, 28),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI * 0.5;
  shadow.position.y = 0.025;
  rig.add(shadow);

  const rim = new THREE.Mesh(shared.monsterBodyGeometry, shared.waterOutlineMaterial);
  rim.name = "monsterRim";
  rim.position.set(0, 0.58, 0.04);
  rim.scale.set(0.99, 1, 0.82);
  rig.add(rim);

  const body = new THREE.Mesh(shared.monsterBodyGeometry, shared.waterMonsterMaterial);
  body.name = "monsterBody";
  body.position.set(0, 0.58, 0.04);
  body.scale.set(0.9, 0.98, 0.76);
  rig.add(body);

  const highlight = new THREE.Mesh(shared.monsterHeadGeometry, shared.waterBellyMaterial);
  highlight.name = "monsterBelly";
  highlight.position.set(-0.18, 0.84, 0.52);
  highlight.scale.set(0.75, 0.5, 0.12);
  highlight.rotation.z = -0.35;
  rig.add(highlight);

  const sideShade = new THREE.Mesh(shared.monsterBodyGeometry, shared.waterFinMaterial);
  sideShade.name = "monsterSideShade";
  sideShade.position.set(0.16, 0.42, 0.14);
  sideShade.scale.set(0.46, 0.58, 0.34);
  sideShade.material = shared.waterFinMaterial.clone();
  sideShade.material.opacity = 0.14;
  rig.add(sideShade);

  const nozzle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.095, 0.32, 14),
    shared.waterBellyMaterial,
  );
  nozzle.name = "monsterNozzle";
  nozzle.position.set(0, 0.78, 0.62);
  nozzle.rotation.x = Math.PI * 0.5;
  nozzle.scale.set(0.82, 0.82, 0.78);
  rig.add(nozzle);

  waterBackpack = createWaterBackpack();
  waterBackpack.visible = false;
  rig.add(waterBackpack);

  waterMagnet = createWaterMagnet();
  waterMagnet.visible = false;
  rig.add(waterMagnet);

  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(shared.monsterEyeGeometry, shared.dark);
    eye.name = side < 0 ? "leftEye" : "rightEye";
    eye.position.set(side * 0.13, 0.92, 0.57);
    eye.scale.set(0.95, 1.15, 0.9);
    rig.add(eye);

    const arm = addDropLimb(rig, side < 0 ? "leftArm" : "rightArm", side, true);
    arm.position.set(side * 0.52, 0.54, 0.08);

    const leg = addDropLimb(rig, side < 0 ? "leftLeg" : "rightLeg", side, false);
    leg.position.set(side * 0.26, -0.02, 0.02);
  }

  const spray = new THREE.Group();
  spray.name = "waterSpray";
  spray.position.set(0, 0.78, 0.83);

  const core = new THREE.Mesh(shared.waterStreamGeometry, shared.waterSprayMaterial.clone());
  core.name = "waterStreamCore";
  core.position.z = 2.35;
  core.scale.set(1, 1, 4.7);
  spray.add(core);

  const droplets = [];
  for (let i = 0; i < 24; i += 1) {
    const material = (i % 4 === 0 ? shared.waterFoamMaterial : shared.waterSprayMaterial).clone();
    const droplet = new THREE.Mesh(shared.waterDropletGeometry, material);
    droplet.name = "waterDroplet";
    droplet.userData.offset = i / 24;
    droplet.userData.side = THREE.MathUtils.randFloatSpread(1);
    droplet.userData.phase = Math.random() * TAU;
    droplet.userData.isFoam = i % 4 === 0;
    spray.add(droplet);
    droplets.push(droplet);
  }
  spray.userData = { core, droplets, targetBlend: 0 };
  rig.add(spray);
  waterSpray = spray;

  const dashTrail = new THREE.Group();
  dashTrail.name = "dashTrail";
  for (let i = 0; i < 30; i += 1) {
    const streak = new THREE.Mesh(shared.dashStreakGeometry, shared.dashTrailMaterial.clone());
    streak.name = "dash-streak";
    streak.userData.offset = Math.random();
    streak.userData.side = THREE.MathUtils.randFloatSpread(0.75);
    streak.userData.height = THREE.MathUtils.randFloat(-0.18, 0.88);
    streak.userData.length = THREE.MathUtils.randFloat(0.9, 2.4);
    streak.userData.band = i < 12 ? "arm" : i < 22 ? "upper" : "body";
    streak.userData.sideSign = Math.random() > 0.5 ? 1 : -1;
    dashTrail.add(streak);
  }
  rig.add(dashTrail);

  const hitbox = new THREE.Mesh(
    new THREE.BoxGeometry(PLAYER_WIDTH * TUBE_RADIUS * 2, 1.42, PLAYER_DEPTH * 2),
    shared.playerHitboxMaterial,
  );
  hitbox.name = "playerHitbox";
  markDebugVisual(hitbox);
  hitbox.position.y = 0.72;
  rig.add(hitbox);

  return rig;
}

function createWaterBackpack() {
  const pack = new THREE.Group();
  pack.name = "waterBackpack";
  pack.position.set(0, 0.58, -0.48);
  pack.scale.set(1.05, 1.05, 1.05);

  const tank = new THREE.Mesh(shared.backpackTankGeometry, shared.backpackMaterial.clone());
  tank.name = "water-backpack-tank";
  tank.scale.set(0.9, 1.32, 0.52);
  tank.position.y = 0.04;
  pack.add(tank);

  const glow = new THREE.Mesh(shared.waterDropletGeometry, shared.waterPickupGlowMaterial.clone());
  glow.name = "water-backpack-glow";
  glow.scale.set(0.48, 0.64, 0.34);
  glow.position.y = 0.05;
  pack.add(glow);

  for (const side of [-1, 1]) {
    const strap = new THREE.Mesh(shared.backpackStrapGeometry, shared.backpackStrapMaterial.clone());
    strap.name = "water-backpack-strap";
    strap.position.set(side * 0.22, 0.02, 0.1);
    strap.rotation.y = side * 0.2;
    strap.scale.set(0.72, 1.25, 0.52);
    pack.add(strap);
  }

  const mouth = new THREE.Mesh(
    new THREE.TorusGeometry(0.18, 0.028, 10, 30),
    shared.backpackMaterial.clone(),
  );
  mouth.name = "water-backpack-open-mouth";
  mouth.position.set(0, 0.46, -0.01);
  mouth.rotation.x = Math.PI * 0.5;
  mouth.scale.set(1.28, 0.88, 1);
  pack.add(mouth);

  const waterSurface = new THREE.Mesh(
    new THREE.CircleGeometry(0.18, 24),
    shared.waterFoamMaterial.clone(),
  );
  waterSurface.name = "water-backpack-open-water";
  waterSurface.position.set(0, 0.466, -0.01);
  waterSurface.rotation.x = -Math.PI * 0.5;
  waterSurface.scale.set(1.2, 0.82, 1);
  pack.add(waterSurface);

  const overflow = new THREE.Group();
  overflow.name = "water-backpack-overflow";
  for (let i = 0; i < 8; i += 1) {
    const drop = new THREE.Mesh(shared.waterDropletGeometry, shared.waterFoamMaterial.clone());
    drop.name = "overflow-water-drop";
    drop.userData.phase = (i / 8) * TAU;
    drop.userData.radius = THREE.MathUtils.randFloat(0.06, 0.17);
    drop.userData.height = THREE.MathUtils.randFloat(0, 0.34);
    drop.scale.setScalar(THREE.MathUtils.randFloat(0.028, 0.052));
    overflow.add(drop);
  }
  pack.add(overflow);

  return pack;
}

function createWaterMagnet() {
  const magnet = new THREE.Group();
  magnet.name = "waterMagnet";
  magnet.position.set(0, 1.82, 0.08);

  const magnetBodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xe32828,
    emissive: 0x7a0808,
    emissiveIntensity: 0.38,
    roughness: 0.42,
  });
  const magnetTipMaterial = new THREE.MeshStandardMaterial({
    color: 0xfff0a8,
    emissive: 0xffc533,
    emissiveIntensity: 0.34,
    roughness: 0.36,
  });

  const horseshoe = new THREE.Mesh(
    new THREE.TorusGeometry(0.32, 0.045, 12, 36, Math.PI),
    magnetBodyMaterial,
  );
  horseshoe.name = "water-magnet-horseshoe";
  horseshoe.rotation.set(0, 0, Math.PI);
  horseshoe.position.y = 0.04;
  magnet.add(horseshoe);

  for (const side of [-1, 1]) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.28, 12), magnetBodyMaterial.clone());
    pole.name = side < 0 ? "water-magnet-left-pole" : "water-magnet-right-pole";
    pole.position.set(side * 0.32, -0.14, 0);
    pole.rotation.z = Math.PI;
    magnet.add(pole);

    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.09), magnetTipMaterial.clone());
    tip.name = side < 0 ? "water-magnet-left-tip" : "water-magnet-right-tip";
    tip.position.set(side * 0.32, -0.3, 0);
    magnet.add(tip);
  }

  const ringMaterial = shared.waterPickupGlowMaterial.clone();
  ringMaterial.opacity = 0.34;
  const ring = new THREE.Mesh(shared.waterPickupRingGeometry, ringMaterial);
  ring.name = "water-magnet-ring";
  ring.scale.setScalar(0.58);
  ring.position.y = -0.08;
  magnet.add(ring);

  const innerRing = new THREE.Mesh(shared.waterPickupRingGeometry, shared.waterFoamMaterial.clone());
  innerRing.name = "water-magnet-inner-ring";
  innerRing.scale.setScalar(0.34);
  innerRing.rotation.x = Math.PI * 0.5;
  innerRing.position.y = -0.08;
  magnet.add(innerRing);

  const core = new THREE.Mesh(shared.waterDropletGeometry, shared.waterPickupMaterial.clone());
  core.name = "water-magnet-core";
  core.scale.set(0.12, 0.17, 0.12);
  core.position.y = -0.05;
  magnet.add(core);

  const halo = new THREE.Mesh(shared.waterPickupRingGeometry, shared.waterSprayMaterial.clone());
  halo.name = "water-magnet-attract-halo";
  halo.scale.setScalar(0.82);
  halo.rotation.y = Math.PI * 0.5;
  halo.position.y = -0.08;
  magnet.add(halo);

  return magnet;
}

function addDropLimb(rig, name, side, isArm) {
  const limb = new THREE.Mesh(shared.dropLimbGeometry, shared.waterFinMaterial.clone());
  limb.name = name;
  limb.scale.set(1, isArm ? 0.62 : 0.58, 1);
  limb.rotation.z = side * (isArm ? 0.95 : 0.28);
  limb.rotation.x = isArm ? -0.2 : 0.08;
  limb.userData.side = side;
  limb.userData.isArm = isArm;
  rig.add(limb);
  return limb;
}

function makeTarHazard(leadingEdgeZ) {
  const type = Math.random() > 0.24 ? "river" : "pool";
  const zSpan = type === "river"
    ? THREE.MathUtils.randFloat(30, 58)
    : THREE.MathUtils.randFloat(7.5, 15);
  const angleSpan = type === "river"
    ? THREE.MathUtils.randFloat(0.82, 1.55)
    : THREE.MathUtils.randFloat(0.82, 1.65);
  const angle = wrapAngle(hazardAngle + THREE.MathUtils.randFloatSpread(2.8));
  const z = leadingEdgeZ - zSpan * 0.5;
  const hazard = {
    kind: "tar",
    type,
    angle,
    z,
    zSpan,
    angleSpan,
    gooHeight: type === "river" ? THREE.MathUtils.randFloat(0.34, 0.72) : THREE.MathUtils.randFloat(0.1, 0.22),
    meander: type === "river" ? THREE.MathUtils.randFloat(0.08, 0.22) : THREE.MathUtils.randFloat(0.04, 0.18),
    spiralTurns: type === "river" ? THREE.MathUtils.randFloat(0.55, 1.05) : 0,
    spiralDirection: Math.random() > 0.5 ? 1 : -1,
    waveFrequency: THREE.MathUtils.randFloat(0.18, 0.42),
    phase: Math.random() * TAU,
    widthKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloat(0.62, 1.48)),
    centerKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloatSpread(type === "river" ? 0.22 : 0.16)),
    edgeKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloatSpread(0.22)),
    group: new THREE.Group(),
    bubbles: [],
  };

  hazardAngle = wrapAngle(angle + THREE.MathUtils.randFloatSpread(1.4));

  const zSegments = type === "river" ? 26 : 14;
  const angleSegments = type === "river" ? 9 : 11;
  const tarMesh = new THREE.Mesh(
    createTarSurfaceGeometry(hazard, TUBE_RADIUS - 0.045, zSegments, angleSegments, true),
    shared.tarMaterial.clone(),
  );
  hazard.group.add(tarMesh);

  const sheenHazard = { ...hazard, angleSpan: angleSpan * 0.42, zSpan: zSpan * 0.78, meander: hazard.meander * 0.55 };
  const sheenMesh = new THREE.Mesh(
    createTarSurfaceGeometry(sheenHazard, TUBE_RADIUS - 0.16, Math.max(8, Math.floor(zSegments * 0.7)), 4, true),
    shared.tarSheenMaterial.clone(),
  );
  hazard.group.add(sheenMesh);

  const hitbox = new THREE.Mesh(
    createTarSurfaceGeometry(hazard, TUBE_RADIUS - 0.28, Math.max(8, Math.floor(zSegments * 0.55)), Math.max(4, angleSegments), false),
    shared.obstacleHitboxMaterial.clone(),
  );
  hitbox.name = `${type}-hitbox`;
  markDebugVisual(hitbox);
  hazard.group.add(hitbox);

  const bubbleCount = Math.floor(THREE.MathUtils.clamp(zSpan * angleSpan * 1.9, 8, type === "river" ? 34 : 22));
  for (let i = 0; i < bubbleCount; i += 1) {
    addTarBubble(hazard);
  }

  scene.add(hazard.group);
  return hazard;
}

function createTarSurfaceGeometry(hazard, radius, zSegments, angleSegments, raised) {
  const vertices = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= zSegments; i += 1) {
    const zT = i / zSegments;
    const z = hazard.z - hazard.zSpan * 0.5 + hazard.zSpan * zT;
    const centerAngle = getHazardAngleAt(hazard, z);
    const widthScale = getHazardWidthScale(hazard, z);
    const edgeNoise = sampleKnots(hazard.edgeKnots, zT);

    for (let j = 0; j <= angleSegments; j += 1) {
      const aT = j / angleSegments;
      const edgeWarp = (Math.sin((zT * 5.7 + aT * 2.1 + hazard.phase) * Math.PI) * 0.055) + edgeNoise * (aT - 0.5) * 0.55;
      const angle = centerAngle + (aT - 0.5) * hazard.angleSpan * widthScale + edgeWarp;
      const edgeT = Math.abs(aT - 0.5) * 2;
      const bulge = raised ? (1 - edgeT ** 2) * hazard.gooHeight * (0.72 + Math.sin(zT * TAU * 1.7 + hazard.phase) * 0.18) : 0;
      const r = radius - Math.max(0, bulge);
      vertices.push(Math.cos(angle) * r, Math.sin(angle) * r, z);
      uvs.push(aT, zT);
    }
  }

  const row = angleSegments + 1;
  for (let i = 0; i < zSegments; i += 1) {
    for (let j = 0; j < angleSegments; j += 1) {
      const a = i * row + j;
      const b = a + 1;
      const c = a + row;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function getHazardAngleAt(hazard, z) {
  const zT = THREE.MathUtils.clamp((z - (hazard.z - hazard.zSpan * 0.5)) / hazard.zSpan, 0, 1);
  const spiralOffset = hazard.type === "river"
    ? (zT - 0.5) * TAU * (hazard.spiralTurns || 0) * (hazard.spiralDirection || 1)
    : 0;
  return wrapAngle(
    hazard.angle +
      spiralOffset +
      Math.sin((z - hazard.z) * hazard.waveFrequency + hazard.phase) * hazard.meander +
      sampleKnots(hazard.centerKnots, zT),
  );
}

function getHazardWidthScale(hazard, z) {
  const t = THREE.MathUtils.clamp((z - (hazard.z - hazard.zSpan * 0.5)) / hazard.zSpan, 0, 1);
  const knotScale = sampleKnots(hazard.widthKnots, t);
  if (hazard.type === "river") {
    return THREE.MathUtils.clamp(knotScale + Math.sin((z - hazard.z) * 0.71 + hazard.phase) * 0.18, 0.42, 1.75);
  }
  const poolTaper = Math.max(0.18, Math.sqrt(Math.max(0, 1 - (t * 2 - 1) ** 2)));
  return THREE.MathUtils.clamp(poolTaper * knotScale, 0.2, 1.65);
}

function sampleKnots(knots, t) {
  if (!knots || knots.length === 0) return 1;
  const scaled = THREE.MathUtils.clamp(t, 0, 1) * (knots.length - 1);
  const index = Math.floor(scaled);
  const next = Math.min(knots.length - 1, index + 1);
  return THREE.MathUtils.lerp(knots[index], knots[next], scaled - index);
}

function addTarBubble(hazard) {
  const zOffset = THREE.MathUtils.randFloatSpread(hazard.zSpan * 0.74);
  const z = hazard.z + zOffset;
  const halfWidth = hazard.angleSpan * 0.5 * getHazardWidthScale(hazard, z);
  const angleOffset = THREE.MathUtils.randFloatSpread(Math.max(0.05, halfWidth * 1.55));
  const mesh = new THREE.Mesh(shared.bubbleGeometry, shared.tarBubbleMaterial.clone());
  mesh.userData.baseScale = THREE.MathUtils.randFloat(0.1, hazard.type === "river" ? 0.32 : 0.38);
  mesh.userData.phase = Math.random() * TAU;
  mesh.userData.angleOffset = angleOffset;
  mesh.userData.zOffset = zOffset;
  hazard.group.add(mesh);
  hazard.bubbles.push(mesh);
  updateTarBubble(hazard, mesh, 0);
}

function updateTarBubble(hazard, bubble, time) {
  const z = hazard.z + bubble.userData.zOffset;
  const angle = getHazardAngleAt(hazard, z) + bubble.userData.angleOffset;
  const pulse = (Math.sin(time * 3.2 + bubble.userData.phase) + 1) * 0.5;
  const scale = bubble.userData.baseScale * (0.75 + pulse * 0.72);
  const frame = getSurfaceFrame(angle, z, 0.3 - pulse * 0.08);
  const basis = new THREE.Matrix4().makeBasis(frame.right, frame.up, frame.forward);
  bubble.position.copy(frame.root);
  bubble.quaternion.setFromRotationMatrix(basis);
  bubble.scale.set(scale, scale * (0.24 + pulse * 0.48), scale);
}

function makeFirePileHazard(leadingEdgeZ) {
  const pathBiasedAngle = Math.random() < 0.7
    ? player.angle + THREE.MathUtils.randFloatSpread(1.55)
    : hazardAngle + THREE.MathUtils.randFloatSpread(2.4);
  const angle = wrapAngle(pathBiasedAngle);
  const speedAllowance = THREE.MathUtils.clamp(speed - 1, 0, 1.9);
  const zSpan = THREE.MathUtils.randFloat(8.6, 13.4);
  const pileHalfWidth = THREE.MathUtils.randFloat(2.45, 3.55);
  const z = leadingEdgeZ - zSpan * 0.5;
  const hazard = {
    kind: "fire",
    type: "tobacco-fire",
    angle,
    z,
    zSpan,
    angleSpan: pileHalfWidth / TUBE_RADIUS,
    pileHalfWidth,
    extinguishWidth: pileHalfWidth + THREE.MathUtils.randFloat(0.62, 1.12) + speedAllowance * 0.32,
    extinguishBack: THREE.MathUtils.randFloat(8.2, 10.6) + speedAllowance * 2.6,
    extinguishFront: THREE.MathUtils.randFloat(1.7, 2.9) + speedAllowance * 0.52,
    firePower: 1,
    waterContact: 0,
    extinguished: false,
    smokeTimer: Math.random() * 0.2,
    group: new THREE.Group(),
    flames: [],
    chunks: [],
    embers: [],
    fireLight: null,
    objectiveLight: null,
  };

  hazardAngle = wrapAngle(angle + THREE.MathUtils.randFloatSpread(1.45));
  positionFirePileBase(hazard);

  const range = new THREE.Mesh(
    new THREE.BoxGeometry(
      hazard.extinguishWidth * 2,
      2.1,
      hazard.extinguishBack + hazard.extinguishFront,
    ),
    shared.fireRangeMaterial.clone(),
  );
  range.name = "water-auto-target-range";
  markDebugVisual(range);
  range.position.set(0, 1.02, (hazard.extinguishFront - hazard.extinguishBack) * 0.5);
  hazard.group.add(range);
  hazard.range = range;

  const targetHalo = new THREE.Mesh(
    new THREE.RingGeometry(hazard.pileHalfWidth * 0.92, hazard.extinguishWidth, 42),
    shared.fireTargetMaterial.clone(),
  );
  targetHalo.name = "blue-extinguish-target-outline";
  targetHalo.rotation.x = -Math.PI * 0.5;
  targetHalo.position.y = 0.045;
  hazard.group.add(targetHalo);
  hazard.targetHalo = targetHalo;

  const objectiveAura = new THREE.Mesh(
    new THREE.RingGeometry(hazard.pileHalfWidth * 1.08, hazard.extinguishWidth * 1.18, 56),
    shared.fireObjectiveAuraMaterial.clone(),
  );
  objectiveAura.name = "blue-objective-aura";
  objectiveAura.rotation.x = -Math.PI * 0.5;
  objectiveAura.position.y = 0.07;
  hazard.group.add(objectiveAura);
  hazard.objectiveAura = objectiveAura;

  const topGlow = new THREE.Mesh(
    new THREE.CircleGeometry(1, 48),
    shared.fireGlowMaterial.clone(),
  );
  topGlow.name = "burning-tobacco-top-glow";
  topGlow.rotation.x = -Math.PI * 0.5;
  topGlow.position.y = 2.15;
  topGlow.scale.set(hazard.pileHalfWidth * 1.24, hazard.zSpan * 0.45, 1);
  hazard.group.add(topGlow);
  hazard.topGlow = topGlow;

  const extinguishLabel = createTextSprite("Extinguish!", {
    fontSize: 54,
    color: "#fff4a8",
    stroke: "rgba(93, 27, 5, 0.96)",
    width: 640,
    height: 180,
    baseScale: new THREE.Vector3(4.6, 1.3, 1),
  });
  extinguishLabel.name = "extinguish-label";
  extinguishLabel.position.set(0, 3.45, 0);
  hazard.group.add(extinguishLabel);
  hazard.extinguishLabel = extinguishLabel;

  const hitbox = new THREE.Mesh(
    new THREE.BoxGeometry(hazard.pileHalfWidth * 2.12, 1.85, hazard.zSpan * 0.98),
    shared.fireHitboxMaterial.clone(),
  );
  hitbox.name = "burning-tobacco-hitbox";
  markDebugVisual(hitbox);
  hitbox.position.y = 0.92;
  hazard.group.add(hitbox);
  hazard.hitbox = hitbox;

  const scorch = new THREE.Mesh(
    new THREE.CircleGeometry(1, 34),
    new THREE.MeshBasicMaterial({
      color: 0x1b0b04,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  scorch.name = "scorched-paper";
  scorch.rotation.x = -Math.PI * 0.5;
  scorch.position.y = 0.035;
  scorch.scale.set(hazard.pileHalfWidth * 1.34, hazard.zSpan * 0.58, 1);
  hazard.group.add(scorch);

  const chunkCount = Math.floor(THREE.MathUtils.randFloat(22, 34));
  for (let i = 0; i < chunkCount; i += 1) {
    addFirePileChunk(hazard);
  }

  const flameCount = Math.floor(THREE.MathUtils.randFloat(17, 27));
  for (let i = 0; i < flameCount; i += 1) {
    addFireFlame(hazard);
  }

  const fireLight = new THREE.PointLight(0xff7a18, 4.35, 17, 2.05);
  fireLight.name = "fire-pile-light";
  fireLight.position.set(0, 1.15, 0);
  hazard.group.add(fireLight);
  hazard.fireLight = fireLight;

  const objectiveLight = new THREE.PointLight(0x45dfff, 1.65, 18, 2.2);
  objectiveLight.name = "blue-objective-light";
  objectiveLight.position.set(0, 1.0, 0);
  hazard.group.add(objectiveLight);
  hazard.objectiveLight = objectiveLight;

  scene.add(hazard.group);
  return hazard;
}

function addFirePileChunk(hazard) {
  const chunk = new THREE.Mesh(shared.tobaccoChunkGeometry, shared.tobaccoMaterial.clone());
  const x = THREE.MathUtils.randFloatSpread(hazard.pileHalfWidth * 1.75);
  const z = THREE.MathUtils.randFloatSpread(hazard.zSpan * 0.68);
  chunk.name = "tobacco-log";
  chunk.position.set(x, THREE.MathUtils.randFloat(0.16, 0.44), z);
  chunk.rotation.set(
    THREE.MathUtils.randFloat(0.72, 1.55),
    Math.random() * TAU,
    THREE.MathUtils.randFloatSpread(0.55),
  );
  const thickness = THREE.MathUtils.randFloat(1.08, 1.8);
  chunk.scale.set(thickness, THREE.MathUtils.randFloat(1.65, 2.9), thickness * THREE.MathUtils.randFloat(0.8, 1.2));
  hazard.group.add(chunk);
  hazard.chunks.push(chunk);

  if (Math.random() < 0.52) {
    const ember = new THREE.Mesh(shared.tobaccoClumpGeometry, shared.emberMaterial.clone());
    ember.name = "glowing-ember";
    ember.position.set(
      x + THREE.MathUtils.randFloatSpread(0.35),
      THREE.MathUtils.randFloat(0.18, 0.5),
      z + THREE.MathUtils.randFloatSpread(0.4),
    );
    ember.scale.setScalar(THREE.MathUtils.randFloat(0.26, 0.5));
    hazard.group.add(ember);
    hazard.embers.push(ember);
  }
}

function addFireFlame(hazard) {
  const flame = new THREE.Mesh(shared.flameGeometry, shared.flameMaterial.clone());
  const core = new THREE.Mesh(shared.flameGeometry, shared.flameCoreMaterial.clone());
  const x = THREE.MathUtils.randFloatSpread(hazard.pileHalfWidth * 1.45);
  const z = THREE.MathUtils.randFloatSpread(hazard.zSpan * 0.56);
  const baseScale = THREE.MathUtils.randFloat(1.08, 1.9);
  const baseHeight = THREE.MathUtils.randFloat(1.62, 3.05);
  const phase = Math.random() * TAU;

  flame.name = "outer-flame";
  flame.position.set(x, 0.62, z);
  flame.rotation.y = Math.random() * TAU;
  flame.scale.set(baseScale, baseHeight, baseScale * 0.72);
  hazard.group.add(flame);

  core.name = "inner-flame";
  core.position.copy(flame.position);
  core.position.y += 0.03;
  core.rotation.y = flame.rotation.y + 0.4;
  core.scale.set(baseScale * 0.52, baseHeight * 0.72, baseScale * 0.42);
  hazard.group.add(core);

  hazard.flames.push({ flame, core, baseScale, baseHeight, phase, baseY: flame.position.y });
}

function positionFirePileBase(hazard) {
  const frame = getSurfaceFrame(hazard.angle, hazard.z, 0.045);
  const basis = new THREE.Matrix4().makeBasis(frame.right, frame.up, frame.forward);
  hazard.group.position.copy(frame.root);
  hazard.group.quaternion.setFromRotationMatrix(basis);
}

function updateFirePile(hazard, dt, time) {
  hazard.waterContact = Math.max(0, (hazard.waterContact || 0) - dt * 3.4);

  if (hazard.extinguished) {
    return;
  }

  const fireAmount = THREE.MathUtils.clamp(hazard.firePower, 0, 1);
  for (const flameInfo of hazard.flames) {
    const pulse = (Math.sin(time * 9.4 + flameInfo.phase) + 1) * 0.5;
    const lean = Math.sin(time * 4.2 + flameInfo.phase) * 0.12;
    const height = flameInfo.baseHeight * (0.76 + pulse * 0.34) * fireAmount;
    const width = flameInfo.baseScale * (0.88 + pulse * 0.24) * (0.72 + fireAmount * 0.28);
    flameInfo.flame.position.y = flameInfo.baseY + pulse * 0.08;
    flameInfo.flame.rotation.z = lean;
    flameInfo.flame.scale.set(width, height, width * 0.72);
    flameInfo.flame.material.opacity = (0.32 + pulse * 0.42) * fireAmount;

    flameInfo.core.position.y = flameInfo.baseY + 0.06 + pulse * 0.07;
    flameInfo.core.rotation.z = -lean * 0.7;
    flameInfo.core.scale.set(width * 0.5, height * 0.72, width * 0.42);
    flameInfo.core.material.opacity = (0.42 + pulse * 0.38) * fireAmount;
  }

  for (const ember of hazard.embers) {
    const glow = 0.55 + Math.sin(time * 5.5 + ember.position.x * 2.3) * 0.45;
    ember.scale.setScalar(THREE.MathUtils.clamp(ember.scale.x + Math.sin(time + glow) * 0.003, 0.18, 0.58));
    ember.material.emissiveIntensity = (0.5 + glow * 0.85) * fireAmount;
  }

  const smokeClarity = getAdaptationConfig().visualClarityBoost || getAdaptationConfig().calmMode ? 0.62 : 1;
  hazard.smokeTimer += dt * smokeClarity * (0.42 + fireAmount * 1.02);
  if (hazard.fireLight) {
    hazard.fireLight.intensity = (2.2 + Math.sin(time * 10.5 + hazard.z) * 0.78) * fireAmount;
  }
  if (hazard.objectiveLight) {
    hazard.objectiveLight.intensity = (0.9 + Math.sin(time * 5.8 + hazard.z) * 0.38) * fireAmount;
  }
  if (hazard.targetHalo) {
    const haloPulse = 1 + Math.sin(time * 6.6 + hazard.z) * 0.16;
    hazard.targetHalo.material.opacity = (0.58 + Math.sin(time * 6.1 + hazard.z) * 0.28) * fireAmount;
    hazard.targetHalo.rotation.z += dt * 0.5;
    hazard.targetHalo.scale.setScalar(haloPulse);
  }
  if (hazard.objectiveAura) {
    const auraPulse = 1 + Math.sin(time * 4.2 + hazard.z) * 0.16;
    hazard.objectiveAura.material.opacity = (0.24 + Math.sin(time * 5.8 + hazard.z) * 0.12) * fireAmount;
    hazard.objectiveAura.rotation.z -= dt * 0.22;
    hazard.objectiveAura.scale.setScalar(auraPulse);
  }
  if (hazard.topGlow) {
    const pulse = 0.82 + Math.sin(time * 5.5 + hazard.z) * 0.18;
    hazard.topGlow.material.opacity = (0.24 + pulse * 0.18) * fireAmount;
    hazard.topGlow.scale.set(hazard.pileHalfWidth * 1.24 * pulse, hazard.zSpan * 0.45 * pulse, 1);
  }
  if (hazard.extinguishLabel) {
    const pulse = 1 + Math.sin(time * 4.2 + hazard.z) * 0.13;
    hazard.extinguishLabel.material.opacity = (0.62 + Math.sin(time * 5.2 + hazard.z) * 0.2) * fireAmount;
    hazard.extinguishLabel.position.y = 3.42 + Math.sin(time * 3.4 + hazard.z) * 0.15;
    hazard.extinguishLabel.scale.copy(hazard.extinguishLabel.userData.baseScale).multiplyScalar(pulse);
  }
  if (hazard.smokeTimer > 0.36) {
    hazard.smokeTimer = 0;
    const smokeLocal = new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(hazard.pileHalfWidth * 1.2),
      THREE.MathUtils.randFloat(1.55, 2.35),
      THREE.MathUtils.randFloatSpread(hazard.zSpan * 0.45),
    );
    addSmoke(
      hazard.group.localToWorld(smokeLocal),
      THREE.MathUtils.randFloat(0.36, 0.74),
      0.09 + fireAmount * 0.1,
      shared.fireSmokeMaterial,
    );
  }
}

function getFireTargetWorld(hazard) {
  return hazard.group.localToWorld(new THREE.Vector3(0, 1.04, 0));
}

function getBeamRangeMultiplier() {
  return DEFAULT_BEAM_RANGE_MULTIPLIER * (activePowerup?.type === "beam" ? BEAM_RANGE_BUFF_MULTIPLIER : 1);
}

function isBeamRangeBuffActive() {
  return state === "running" && activePowerup?.type === "beam";
}

function getFireSprayTarget() {
  if (state !== "running" || distance < START_CLEAR_DISTANCE || !waterSpray) return null;

  let bestTarget = null;
  let bestScore = Infinity;
  const playerTarget = getPlayerTargetWorld();
  const beamRangeMultiplier = getBeamRangeMultiplier();
  playerRig.updateMatrixWorld(true);

  for (const obstacle of obstacles) {
    if (obstacle.kind !== "fire" || obstacle.extinguished) continue;
    obstacle.group.updateMatrixWorld(true);
    const playerLocal = obstacle.group.worldToLocal(playerTarget.clone());
    if (Math.abs(playerLocal.x) > obstacle.extinguishWidth * beamRangeMultiplier) continue;
    if (playerLocal.z < -obstacle.extinguishBack * beamRangeMultiplier || playerLocal.z > obstacle.extinguishFront * beamRangeMultiplier) continue;

    const targetWorld = getFireTargetWorld(obstacle);
    const sprayLocal = playerRig.worldToLocal(targetWorld.clone()).sub(waterSpray.position);
    if (sprayLocal.z < 0.3) continue;

    const score = sprayLocal.lengthSq() + Math.abs(playerLocal.x) * 2.6 + Math.max(0, -playerLocal.z) * 0.2;
    if (score < bestScore) {
      bestScore = score;
      bestTarget = { hazard: obstacle, targetWorld, sprayLocal };
    }
  }

  return bestTarget;
}

function getFirePlayerContactState(hazard) {
  if (!hazard || hazard.extinguished) {
    return { inRange: false, touching: false, playerLocal: new THREE.Vector3() };
  }
  hazard.group.updateMatrixWorld(true);
  const playerLocal = getPlayerTargetLocal(hazard);
  const beamRangeMultiplier = getBeamRangeMultiplier();
  const playerHalfWidth = getPlayerWidth() * TUBE_RADIUS;
  const playerHalfDepth = getPlayerDepth();
  const inRange =
    Math.abs(playerLocal.x) <= hazard.extinguishWidth * beamRangeMultiplier &&
    playerLocal.z >= -hazard.extinguishBack * beamRangeMultiplier &&
    playerLocal.z <= hazard.extinguishFront * beamRangeMultiplier;
  const touching =
    Math.abs(playerLocal.x) <= hazard.pileHalfWidth + playerHalfWidth &&
    Math.abs(playerLocal.z) <= hazard.zSpan * 0.5 + playerHalfDepth &&
    playerLocal.y >= -0.15 &&
    playerLocal.y <= 2.35;
  return { inRange, touching, playerLocal };
}

function updatePhysicalFireExtinguishing(dt, beamTargetHazard = null) {
  if (state !== "running" || distance < START_CLEAR_DISTANCE) return;

  for (const obstacle of obstacles) {
    if (obstacle.kind !== "fire" || obstacle.extinguished) continue;

    const contact = getFirePlayerContactState(obstacle);
    if (!contact.inRange && !contact.touching) continue;
    if (obstacle === beamTargetHazard && !contact.touching) continue;

    obstacle.waterContact = 1;

    if (contact.touching) {
      obstacle.firePower = 0;
      addWaterSplash(obstacle, 18);
      addSmoke(
        getFireTargetWorld(obstacle),
        THREE.MathUtils.randFloat(0.34, 0.58),
        0.42,
        shared.smokeMaterial,
      );
      extinguishFire(obstacle);
      continue;
    }

    const speedAssist = 1 + THREE.MathUtils.clamp(speed - 1, 0, 1.9) * 0.72;
    const coolingAssist = getAdaptationConfig().coolingVisualBoost ? 1.16 : 1;
    obstacle.firePower = Math.max(0, obstacle.firePower - dt * FIRE_EXTINGUISH_RATE * 1.05 * speedAssist * coolingAssist);
    if (Math.random() < dt * 28) {
      addWaterSplash(obstacle, getAdaptationConfig().coolingVisualBoost ? 4 : 2);
    }
    if (Math.random() < dt * 5.5) {
      addSmoke(
        getFireTargetWorld(obstacle),
        THREE.MathUtils.randFloat(0.22, 0.42),
        0.24,
        shared.smokeMaterial,
      );
    }
    if (obstacle.firePower <= 0) {
      extinguishFire(obstacle);
    }
  }
}

function updateWaterSpray(dt) {
  if (!waterSpray) return;

  const time = performance.now() * 0.001;
  waterSpray.visible = !player.crushed;
  const beamBuffActive = isBeamRangeBuffActive();
  const beamBuffPulse = beamBuffActive ? 0.5 + Math.sin(time * 12.4) * 0.5 : 0;

  const target = getFireSprayTarget();
  const targetBlend = THREE.MathUtils.lerp(
    waterSpray.userData.targetBlend || 0,
    target ? 1 : 0,
    Math.min(1, dt * 8),
  );
  waterSpray.userData.targetBlend = targetBlend;

  const forward = new THREE.Vector3(0, 0, 1);
  let streamLength = 4.55;
  let streamDirection = forward;

  if (target) {
    streamLength = THREE.MathUtils.clamp(target.sprayLocal.length(), 1.55, beamBuffActive ? 12.8 : 6.4);
    streamDirection = target.sprayLocal.clone().normalize();
    target.hazard.waterContact = 1;
    const speedAssist = 1 + THREE.MathUtils.clamp(speed - 1, 0, 1.9) * 0.9;
    const coolingAssist = getAdaptationConfig().coolingVisualBoost ? 1.16 : 1;
    target.hazard.firePower = Math.max(0, target.hazard.firePower - dt * FIRE_EXTINGUISH_RATE * speedAssist * coolingAssist);

    if (Math.random() < dt * (getAdaptationConfig().coolingVisualBoost ? 64 : 42)) {
      addWaterSplash(target.hazard, getAdaptationConfig().coolingVisualBoost ? 5 : 3);
    }

    if (Math.random() < dt * 8) {
      const steamLocal = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(target.hazard.pileHalfWidth * 0.75),
        THREE.MathUtils.randFloat(0.9, 1.45),
        THREE.MathUtils.randFloatSpread(target.hazard.zSpan * 0.36),
      );
      addSmoke(
        target.hazard.group.localToWorld(steamLocal),
        THREE.MathUtils.randFloat(0.24, 0.46),
        0.28,
        shared.smokeMaterial,
      );
    }

    if (target.hazard.firePower <= 0) {
      extinguishFire(target.hazard);
    }
  }

  updatePhysicalFireExtinguishing(dt, target?.hazard || null);

  const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(forward, streamDirection);
  waterSpray.quaternion.slerp(targetQuaternion, Math.min(1, dt * (target ? 12 : 5)));

  const core = waterSpray.userData.core;
  if (core) {
    const reachWidth = THREE.MathUtils.clamp((streamLength - 3.6) / 5.6, 0, 1);
    const coolingWidth = getAdaptationConfig().coolingVisualBoost ? 1.18 : 1;
    const beamWidth = (0.52 + targetBlend * 0.34) * (1 + reachWidth * 0.82) * coolingWidth * (beamBuffActive ? 1.08 + beamBuffPulse * 0.12 : 1);
    core.material.color.set(beamBuffActive ? 0xfff15a : 0x91efff);
    core.position.z = streamLength * 0.5;
    core.scale.set(beamWidth, beamWidth, streamLength);
    core.material.opacity = beamBuffActive ? 0.28 + beamBuffPulse * 0.18 + targetBlend * 0.1 : 0.12 + targetBlend * 0.18;
  }

  for (const droplet of waterSpray.userData.droplets || []) {
    const cycle = (time * (3.1 + targetBlend * 1.8) + droplet.userData.offset) % 1;
    const reachSpread = THREE.MathUtils.clamp((streamLength - 3.6) / 5.6, 0, 1);
    const spread = (0.03 + cycle * (target ? 0.18 + reachSpread * 0.22 : 0.24)) * (0.75 + targetBlend * 0.22);
    const swirl = time * 7.5 + droplet.userData.phase;
    droplet.position.set(
      Math.sin(swirl) * spread + droplet.userData.side * spread * 0.32,
      Math.cos(swirl * 0.8) * spread * 0.54,
      0.35 + cycle * streamLength,
    );
    droplet.material.color.set(beamBuffActive ? (droplet.userData.isFoam ? 0xffffc8 : 0xffdf37) : (droplet.userData.isFoam ? 0xe9fbff : 0x91efff));
    droplet.scale.setScalar((0.075 + cycle * 0.095) * (target ? 1.28 : 1.04) * (beamBuffActive ? 1.08 + beamBuffPulse * 0.14 : 1));
    droplet.material.opacity = (0.5 + (1 - cycle) * 0.44) * (0.86 + targetBlend * 0.14) * (beamBuffActive ? 1.02 + beamBuffPulse * 0.22 : 1);
  }

  if (state === "running" && !player.crushed && waterBopCooldown <= 0) {
    playWaterBopSound(targetBlend);
    waterBopCooldown = target ? 0.18 : 0.24;
  }
}

function extinguishFire(hazard) {
  if (!hazard || hazard.extinguished) return;

  hazard.extinguished = true;
  hazard.firePower = 0;
  extinguishedCount += 1;
  const rewardMultiplier = getAdaptationConfig().rewardFeedbackMultiplier;
  if (rewardMultiplier > 1) {
    const bonusDistance = Math.round((rewardMultiplier - 1) * 24);
    distance += bonusDistance;
    showSupportMessage(`Cooled it down +${bonusDistance}m`, 1.8);
  } else if (getAdaptationConfig().supportiveMessageMode) {
    showSupportMessage("Good cooling - keep riding the wave.", 1.8);
  }
  pulseHudScore(extinguishedEl);
  playExtinguishSound();

  for (const flameInfo of hazard.flames) {
    flameInfo.flame.visible = false;
    flameInfo.core.visible = false;
  }

  for (const chunk of hazard.chunks) {
    chunk.material = shared.charredTobaccoMaterial.clone();
  }

  for (const ember of hazard.embers) {
    ember.material = shared.charredTobaccoMaterial.clone();
    ember.scale.multiplyScalar(0.76);
  }

  if (hazard.range) hazard.range.visible = false;
  if (hazard.fireLight) hazard.fireLight.visible = false;
  if (hazard.objectiveLight) hazard.objectiveLight.visible = false;
  if (hazard.targetHalo) hazard.targetHalo.visible = false;
  if (hazard.objectiveAura) hazard.objectiveAura.visible = false;
  if (hazard.topGlow) hazard.topGlow.visible = false;
  if (hazard.extinguishLabel) hazard.extinguishLabel.visible = false;
  if (hazard.hitbox) {
    hazard.hitbox.material.color.set(0x27211c);
    hazard.hitbox.material.opacity = 0.42;
  }

  for (let i = 0; i < 12; i += 1) {
    const steamLocal = new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(hazard.pileHalfWidth * 1.2),
      THREE.MathUtils.randFloat(0.75, 1.65),
      THREE.MathUtils.randFloatSpread(hazard.zSpan * 0.45),
    );
    addSmoke(hazard.group.localToWorld(steamLocal), THREE.MathUtils.randFloat(0.32, 0.68), 0.36, shared.smokeMaterial);
  }
  addWaterSplash(hazard, Math.round(34 * rewardMultiplier));

  updateHud();
}

function makeWaterPickupHazard(leadingEdgeZ, options = {}) {
  const angle = wrapAngle(options.angle ?? (player.angle + THREE.MathUtils.randFloatSpread(1.85)));
  const z = options.z ?? (leadingEdgeZ - THREE.MathUtils.randFloat(1.2, 2.8));
  const clarityScale = getAdaptationConfig().visualClarityBoost ? 1.12 : 1;
  const radius = (options.radius ?? THREE.MathUtils.randFloat(0.72, 1.02)) * clarityScale;
  const hazard = {
    kind: "water",
    type: options.formation ? "moisture-formation" : "moisture-pickup",
    angle,
    z,
    zSpan: options.zSpan ?? 3.15,
    angleSpan: (radius * 2.2) / TUBE_RADIUS,
    radius,
    phase: Math.random() * TAU,
    formation: Boolean(options.formation),
    collected: false,
    group: new THREE.Group(),
  };

  if (!options.keepHazardAngle) {
    hazardAngle = wrapAngle(angle + THREE.MathUtils.randFloatSpread(1.1));
  }

  const drop = new THREE.Mesh(shared.monsterBodyGeometry, shared.waterPickupMaterial.clone());
  drop.name = "collectible-water-droplet";
  drop.scale.set(radius * 1.25, radius * 1.04, radius * 0.78);
  hazard.group.add(drop);
  hazard.drop = drop;

  const glow = new THREE.Mesh(shared.waterDropletGeometry, shared.waterPickupGlowMaterial.clone());
  glow.name = "water-pickup-glow";
  glow.scale.setScalar(radius * 1.45);
  hazard.group.add(glow);
  hazard.glow = glow;

  const ring = new THREE.Mesh(shared.waterPickupRingGeometry, shared.waterPickupGlowMaterial.clone());
  ring.name = "water-pickup-ring";
  ring.rotation.x = Math.PI * 0.5;
  ring.scale.setScalar(radius * 1.18);
  hazard.group.add(ring);
  hazard.ring = ring;

  const hitbox = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.78, 14, 10),
    shared.waterPickupHitboxMaterial.clone(),
  );
  hitbox.name = "water-pickup-hitbox";
  markDebugVisual(hitbox);
  hazard.group.add(hitbox);
  hazard.hitbox = hitbox;

  positionFloatingSurfaceObject(hazard, 1.18, 0);
  scene.add(hazard.group);
  return hazard;
}

function updateWaterPickup(hazard, dt, time) {
  if (!hazard || hazard.collected) return;

  const bob = Math.sin(time * 4.1 + hazard.phase) * 0.18;
  positionFloatingSurfaceObject(hazard, 1.12, bob);
  if (hazard.drop) {
    const pulse = 1 + Math.sin(time * 5.8 + hazard.phase) * 0.08;
    hazard.drop.rotation.y = time * 1.8 + hazard.phase;
    hazard.drop.scale.set(hazard.radius * 1.25 * pulse, hazard.radius * 1.04 * (1 / pulse), hazard.radius * 0.78 * pulse);
  }
  if (hazard.glow) {
    hazard.glow.material.opacity = 0.18 + Math.sin(time * 4.7 + hazard.phase) * 0.08;
  }
  if (hazard.ring) {
    hazard.ring.rotation.z += dt * 2.4;
    hazard.ring.material.opacity = 0.22 + Math.sin(time * 6.2 + hazard.phase) * 0.12;
  }

  if (distance < START_CLEAR_DISTANCE) return;
  const dz = Math.abs(hazard.z - player.z);
  const angularDistance = Math.abs(angleDelta(player.angle, hazard.angle));
  const pickupAngle = getPlayerWidth() + hazard.angleSpan * 1.35;
  if (dz < getPlayerDepth() * 1.8 + hazard.radius * 1.45 && angularDistance < pickupAngle) {
    collectWaterPickup(hazard);
  }
}

function collectWaterPickup(hazard) {
  if (!hazard || hazard.collected) return;
  hazard.collected = true;
  moisture = Math.min(getMoistureCap(), moisture + WATER_PICKUP_VALUE * getAdaptationConfig().waterPickupMultiplier);
  pulseHudScore(moistureEl);
  playWaterCollectSound();

  const origin = hazard.group.localToWorld(new THREE.Vector3(0, 0, 0));
  for (let i = 0; i < 18; i += 1) {
    const material = shared.splashMaterial.clone();
    material.opacity = THREE.MathUtils.randFloat(0.58, 0.9);
    const mesh = new THREE.Mesh(shared.waterDropletGeometry, material);
    mesh.position.copy(origin);
    mesh.scale.setScalar(THREE.MathUtils.randFloat(0.04, 0.1));
    splashGroup.add(mesh);
    splashes.push({
      mesh,
      velocity: new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(3.6),
        THREE.MathUtils.randFloatSpread(3.2),
        THREE.MathUtils.randFloatSpread(3.6),
      ),
      life: THREE.MathUtils.randFloat(0.28, 0.54),
      maxLife: 0.54,
      spin: THREE.MathUtils.randFloatSpread(6),
    });
  }

  scene.remove(hazard.group);
  checkMoistureBandFeedback();
  updateHud();
}

function spawnWaterFormationToward(target) {
  if (!target || !["fire", "powerup"].includes(target.kind)) return;
  if (!shouldSpawnWaterGuide(target)) return;

  lastGuideDistance = distance;
  const leadingZ = target.z + target.zSpan * 0.5;
  const spacing = 5.5;
  const startOffset = target.kind === "fire" ? 48 : target.kind === "powerup" ? 42 : 32;
  const endOffset = target.kind === "fire" ? 15 : target.kind === "powerup" ? 13 : 12;
  const baseRadius = target.kind === "fire" ? 0.88 : target.kind === "powerup" ? 0.82 : 0.78;
  const phase = target.phase || target.z * 0.013;
  const startAngle = player.angle;
  const targetDelta = angleDelta(target.angle, startAngle);
  const offsets = [];

  for (let offset = startOffset; offset >= endOffset; offset -= spacing) {
    offsets.push(offset);
  }

  for (const [index, offset] of offsets.entries()) {
    const guideT = (index + 1) / offsets.length;
    const guideCenter = wrapAngle(startAngle + targetDelta * THREE.MathUtils.lerp(0.32, 1, guideT));
    const arcBend = Math.sin(guideT * Math.PI) * THREE.MathUtils.clamp(targetDelta, -0.92, 0.92) * 0.16;
    const sideWiggle = Math.sin(index * 1.37 + phase) * 0.055;
    const angle = wrapAngle(guideCenter + arcBend + sideWiggle);
    const z = leadingZ + offset;
    const radius = baseRadius * (0.94 + Math.sin(index * 0.9 + phase) * 0.07);
    const droplet = makeWaterPickupHazard(null, {
      angle,
      z,
      radius,
      zSpan: 2.65,
      formation: true,
      keepHazardAngle: true,
    });
    obstacles.push(droplet);
  }
}

function shouldSpawnWaterGuide(target) {
  const minGap = target.kind === "powerup" ? 170 : target.kind === "fire" ? 145 : 120;
  if (distance - lastGuideDistance < minGap) return false;

  const flowBoost = getAdaptationConfig().wallRunFrequencyMultiplier > 1.15 ? 1.18 : 1;
  const chance = (target.kind === "powerup" ? 0.52 : target.kind === "fire" ? 0.34 : 0.24) * flowBoost;
  return Math.random() < chance;
}

function makePowerupBoxHazard(leadingEdgeZ) {
  const angle = wrapAngle(player.angle + THREE.MathUtils.randFloatSpread(1.9));
  const z = leadingEdgeZ - THREE.MathUtils.randFloat(1.6, 3.4);
  const hazard = {
    kind: "powerup",
    type: "roulette-box",
    angle,
    z,
    zSpan: 4.6,
    angleSpan: 0.38,
    phase: Math.random() * TAU,
    collected: false,
    group: new THREE.Group(),
  };

  hazardAngle = wrapAngle(angle + THREE.MathUtils.randFloatSpread(1.2));

  const box = new THREE.Mesh(shared.powerupBoxGeometry, shared.powerupBoxMaterial.clone());
  box.name = "roulette-powerup-box";
  box.scale.set(1.38, 1.38, 1.38);
  addQuestionMarksToBox(box);
  hazard.group.add(box);
  hazard.box = box;

  const ring = new THREE.Mesh(shared.waterPickupRingGeometry, shared.fireTargetMaterial.clone());
  ring.name = "powerup-pickup-ring";
  ring.scale.setScalar(1.45);
  ring.rotation.x = Math.PI * 0.5;
  hazard.group.add(ring);
  hazard.ring = ring;

  const hitbox = new THREE.Mesh(
    new THREE.BoxGeometry(2.75, 2.75, 2.95),
    shared.powerupHitboxMaterial.clone(),
  );
  hitbox.name = "roulette-powerup-hitbox";
  markDebugVisual(hitbox);
  hazard.group.add(hitbox);
  hazard.hitbox = hitbox;

  positionFloatingSurfaceObject(hazard, 1.2, 0.14);
  scene.add(hazard.group);
  return hazard;
}

function updatePowerupBox(hazard, dt, time) {
  if (!hazard || hazard.collected) return;

  const bob = Math.sin(time * 3.8 + hazard.phase) * 0.2;
  positionFloatingSurfaceObject(hazard, 1.2, 0.2 + bob);
  if (hazard.box) {
    hazard.box.rotation.x += dt * 0.9;
    hazard.box.rotation.y += dt * 1.35;
    const pulse = 1 + Math.sin(time * 6 + hazard.phase) * 0.08;
    hazard.box.scale.setScalar(1.38 * pulse);
    hazard.box.material.emissiveIntensity = 0.44 + pulse * 0.22;
  }
  if (hazard.ring) {
    hazard.ring.rotation.z += dt * 2.9;
    hazard.ring.material.opacity = 0.38 + Math.sin(time * 5.4 + hazard.phase) * 0.18;
  }

  if (distance < START_CLEAR_DISTANCE) return;
  const dz = Math.abs(hazard.z - player.z);
  const angularDistance = Math.abs(angleDelta(player.angle, hazard.angle));
  if (dz < getPlayerDepth() * 1.8 + 1.35 && angularDistance < getPlayerWidth() + hazard.angleSpan * 1.8) {
    collectPowerupBox(hazard);
  }
}

function collectPowerupBox(hazard) {
  if (!hazard || hazard.collected) return;
  hazard.collected = true;
  playPowerupCollectSound();
  startPowerupRoll();

  const origin = hazard.group.localToWorld(new THREE.Vector3(0, 0, 0));
  addPositionSplash(origin, 24, 4.2, 0.08, 0.15);
  scene.remove(hazard.group);
  updateHud();
}

function makeWaterPoolHazard(leadingEdgeZ) {
  const zSpan = THREE.MathUtils.randFloat(9.5, 18);
  const angleSpan = THREE.MathUtils.randFloat(0.7, 1.35);
  const angle = wrapAngle(player.angle + THREE.MathUtils.randFloatSpread(2.1));
  const z = leadingEdgeZ - zSpan * 0.5;
  const hazard = {
    kind: "waterPool",
    type: "pool",
    angle,
    z,
    zSpan,
    angleSpan,
    gooHeight: THREE.MathUtils.randFloat(0.05, 0.1),
    meander: THREE.MathUtils.randFloat(0.03, 0.12),
    waveFrequency: THREE.MathUtils.randFloat(0.2, 0.44),
    phase: Math.random() * TAU,
    widthKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloat(0.78, 1.42)),
    centerKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloatSpread(0.14)),
    edgeKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloatSpread(0.18)),
    refillContact: 0,
    group: new THREE.Group(),
    ripples: [],
  };

  hazardAngle = wrapAngle(angle + THREE.MathUtils.randFloatSpread(1.2));

  const pool = new THREE.Mesh(
    createTarSurfaceGeometry(hazard, TUBE_RADIUS - 0.065, 16, 12, true),
    shared.waterPoolMaterial.clone(),
  );
  pool.name = "moisture-water-pool";
  hazard.group.add(pool);
  hazard.pool = pool;

  const hitbox = new THREE.Mesh(
    createTarSurfaceGeometry(hazard, TUBE_RADIUS - 0.22, 10, 8, false),
    shared.waterPoolHitboxMaterial.clone(),
  );
  hitbox.name = "water-pool-refill-hitbox";
  markDebugVisual(hitbox);
  hazard.group.add(hitbox);
  hazard.hitbox = hitbox;

  for (let i = 0; i < 5; i += 1) {
    const ring = new THREE.Mesh(shared.waterPickupRingGeometry, shared.waterPickupGlowMaterial.clone());
    ring.name = "water-pool-ripple";
    ring.userData.zOffset = THREE.MathUtils.randFloatSpread(zSpan * 0.58);
    ring.userData.angleOffset = THREE.MathUtils.randFloatSpread(angleSpan * 0.46);
    ring.userData.phase = Math.random() * TAU;
    ring.scale.setScalar(THREE.MathUtils.randFloat(0.7, 1.35));
    hazard.group.add(ring);
    hazard.ripples.push(ring);
  }

  scene.add(hazard.group);
  return hazard;
}

function updateWaterPool(hazard, dt, time) {
  if (!hazard) return;
  hazard.refillContact = Math.max(0, (hazard.refillContact || 0) - dt * 3.5);

  for (const ripple of hazard.ripples) {
    const z = hazard.z + ripple.userData.zOffset;
    const angle = getHazardAngleAt(hazard, z) + ripple.userData.angleOffset;
    const frame = getSurfaceFrame(angle, z, 0.08);
    const basis = new THREE.Matrix4().makeBasis(frame.right, frame.up, frame.forward);
    const pulse = 0.72 + Math.sin(time * 2.6 + ripple.userData.phase) * 0.22;
    ripple.position.copy(hazard.group.worldToLocal(frame.root.clone()));
    ripple.quaternion.setFromRotationMatrix(basis);
    ripple.rotation.z += time * 0.2;
    ripple.scale.setScalar(pulse);
    ripple.material.opacity = 0.14 + pulse * 0.12;
  }

  if (!isPlayerOnSurfacePatch(hazard, getPlayerDepth() * 0.82, getPlayerWidth() * 1.25)) return;

  hazard.refillContact = 1;
  const before = moisture;
  moisture = THREE.MathUtils.clamp(moisture + WATER_POOL_REFILL_RATE * getAdaptationConfig().waterPickupMultiplier * dt, 0, getMoistureCap());
  if (Math.floor(before / 10) !== Math.floor(moisture / 10)) {
    pulseHudScore(moistureEl);
  }
  checkMoistureBandFeedback();
  if (waterPoolSoundCooldown <= 0) {
    playWaterPoolSound();
    waterPoolSoundCooldown = 0.55;
  }
}

function makeSpeedPadHazard(leadingEdgeZ) {
  const zSpan = THREE.MathUtils.randFloat(8.8, 13.2);
  const angleSpan = THREE.MathUtils.randFloat(0.78, 1.26);
  const angle = wrapAngle(player.angle + THREE.MathUtils.randFloatSpread(1.95));
  const z = leadingEdgeZ - zSpan * 0.5;
  const hazard = {
    kind: "speedPad",
    type: "speed-pad",
    angle,
    z,
    zSpan,
    angleSpan,
    gooHeight: THREE.MathUtils.randFloat(0.05, 0.1),
    meander: THREE.MathUtils.randFloat(0.02, 0.1),
    waveFrequency: THREE.MathUtils.randFloat(0.18, 0.34),
    phase: Math.random() * TAU,
    widthKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloat(0.78, 1.28)),
    centerKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloatSpread(0.1)),
    edgeKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloatSpread(0.14)),
    activated: false,
    group: new THREE.Group(),
    arrows: [],
  };

  hazardAngle = wrapAngle(angle + THREE.MathUtils.randFloatSpread(1.2));

  const pad = new THREE.Mesh(
    createTarSurfaceGeometry(hazard, TUBE_RADIUS - 0.055, 14, 10, true),
    shared.speedPadMaterial.clone(),
  );
  pad.name = "speed-ramp-pad";
  hazard.group.add(pad);
  hazard.pad = pad;

  const hitbox = new THREE.Mesh(
    createTarSurfaceGeometry(hazard, TUBE_RADIUS - 0.2, 8, 7, false),
    shared.speedPadHitboxMaterial.clone(),
  );
  hitbox.name = "speed-ramp-hitbox";
  markDebugVisual(hitbox);
  hazard.group.add(hitbox);
  hazard.hitbox = hitbox;

  for (let i = 0; i < 5; i += 1) {
    const arrow = new THREE.Mesh(shared.speedPadArrowGeometry, shared.speedPadArrowMaterial.clone());
    arrow.name = "speed-ramp-arrow";
    arrow.userData.zT = (i + 0.5) / 5;
    arrow.userData.side = i % 2 === 0 ? 0 : (i % 4 === 1 ? -0.18 : 0.18);
    arrow.userData.phase = Math.random() * TAU;
    arrow.scale.set(1.05, 1.25, 1);
    hazard.group.add(arrow);
    hazard.arrows.push(arrow);
  }

  scene.add(hazard.group);
  return hazard;
}

function updateSpeedPad(hazard, dt, time) {
  if (!hazard) return;
  const activePulse = hazard.activated ? 1 : 0;
  const blink = 0.5 + Math.sin(time * 8.4 + hazard.phase) * 0.5;
  if (hazard.pad) {
    hazard.pad.material.opacity = 0.34 + blink * 0.24 + activePulse * 0.2;
  }
  if (hazard.hitbox) {
    hazard.hitbox.material.opacity = 0.48 + blink * 0.32;
  }

  for (const arrow of hazard.arrows) {
    positionSpeedPadArrow(hazard, arrow, time);
  }

  if (hazard.activated) return;
  if (!isPlayerOnSurfacePatch(hazard, getPlayerDepth() * 0.92, getPlayerWidth() * 1.25)) return;

  hazard.activated = true;
  speedPadTimer = Math.max(speedPadTimer, SPEED_PAD_DURATION);
  pulseHudScore(speedEl);
  if (speedPadSoundCooldown <= 0) {
    playSpeedPadSound();
    speedPadSoundCooldown = 0.28;
  }
  addPlayerSplash(18);
}

function positionSpeedPadArrow(hazard, arrow, time) {
  const z = hazard.z - hazard.zSpan * 0.5 + hazard.zSpan * arrow.userData.zT;
  const angle = getHazardAngleAt(hazard, z) + arrow.userData.side * hazard.angleSpan;
  const frame = getSurfaceFrame(angle, z, 0.13);
  const basis = new THREE.Matrix4().makeBasis(frame.right, frame.forward, frame.up);
  const pulse = 1 + Math.sin(time * 7.6 + arrow.userData.phase) * 0.12;
  arrow.position.copy(hazard.group.worldToLocal(frame.root.clone()));
  arrow.quaternion.setFromRotationMatrix(basis);
  arrow.scale.set(1.05 * pulse, 1.25 * pulse, 1);
  arrow.material.opacity = 0.48 + pulse * 0.22;
}

function makeCollapsedWallHazard(leadingEdgeZ) {
  const pathBiasedAngle = Math.random() < 0.72
    ? player.angle + THREE.MathUtils.randFloatSpread(1.55)
    : hazardAngle + THREE.MathUtils.randFloatSpread(2.4);
  const angle = wrapAngle(pathBiasedAngle);
  const zSpan = THREE.MathUtils.randFloat(4.8, 7.2);
  const angleSpan = THREE.MathUtils.randFloat(Math.PI * 0.86, Math.PI * 1.04);
  const wallWidth = angleSpan * TUBE_RADIUS;
  const wallChordWidth = Math.sin(angleSpan * 0.5) * TUBE_RADIUS * 2;
  const wallHeight = TUBE_RADIUS * THREE.MathUtils.randFloat(0.46, 0.56);
  const z = leadingEdgeZ - zSpan * 0.5;
  const hazard = {
    kind: "wall",
    type: "collapsed-cigarette-wall",
    angle,
    z,
    zSpan,
    angleSpan,
    wallWidth,
    wallChordWidth,
    wallHeight,
    topKnots: Array.from({ length: 11 }, () => THREE.MathUtils.randFloat(0.72, 1.08)),
    phase: Math.random() * TAU,
    hit: false,
    group: new THREE.Group(),
  };

  hazardAngle = wrapAngle(angle + THREE.MathUtils.randFloatSpread(1.45));
  positionCollapsedWallBase(hazard);

  const slab = new THREE.Mesh(
    createCollapsedWallGeometry(hazard, 0.06, 1, 24, 5, 2),
    shared.collapsedWallMaterial.clone(),
  );
  slab.name = "collapsed-cigarette-wall-slab";
  hazard.group.add(slab);
  hazard.slab = slab;

  const jaggedCount = 13;
  for (let i = 0; i < jaggedCount; i += 1) {
    const shardHeight = wallHeight * THREE.MathUtils.randFloat(0.34, 0.98);
    const shard = new THREE.Mesh(
      new THREE.BoxGeometry(wallChordWidth / jaggedCount * THREE.MathUtils.randFloat(0.68, 1.15), shardHeight, THREE.MathUtils.randFloat(0.06, 0.14)),
      i % 2 === 0 ? shared.collapsedWallMaterial.clone() : shared.collapsedWallEdgeMaterial.clone(),
    );
    shard.name = "torn-wall-paper-shard";
    shard.position.set(
      -wallChordWidth * 0.5 + (i + 0.5) * (wallChordWidth / jaggedCount),
      shardHeight * 0.5 + THREE.MathUtils.randFloat(-0.04, 0.08),
      -zSpan * 0.52,
    );
    shard.rotation.z = THREE.MathUtils.randFloatSpread(0.1);
    hazard.group.add(shard);
  }

  for (let i = 0; i < 10; i += 1) {
    const fiber = new THREE.Mesh(
      new THREE.BoxGeometry(THREE.MathUtils.randFloat(0.035, 0.08), wallHeight * THREE.MathUtils.randFloat(0.36, 0.88), 0.035),
      shared.collapsedWallEdgeMaterial.clone(),
    );
    fiber.name = "collapsed-wall-paper-fiber";
    fiber.position.set(
      THREE.MathUtils.randFloatSpread(wallChordWidth * 0.9),
      wallHeight * THREE.MathUtils.randFloat(0.22, 0.86),
      THREE.MathUtils.randFloatSpread(zSpan * 0.82),
    );
    fiber.rotation.z = THREE.MathUtils.randFloatSpread(0.2);
    hazard.group.add(fiber);
  }

  const hitbox = new THREE.Mesh(
    createCollapsedWallGeometry(hazard, 0.2, 1.04, 18, 4, 1),
    shared.collapsedWallHitboxMaterial.clone(),
  );
  hitbox.name = "collapsed-wall-hitbox";
  markDebugVisual(hitbox);
  hazard.group.add(hitbox);
  hazard.hitbox = hitbox;

  scene.add(hazard.group);
  return hazard;
}

function createCollapsedWallGeometry(hazard, inset, heightScale, angleSegments, heightSegments, zSegments) {
  const vertices = [];
  const indices = [];
  const centerFrame = getSurfaceFrame(hazard.angle, hazard.z, 0.06);

  const toLocal = (point) => {
    const delta = point.clone().sub(centerFrame.root);
    return new THREE.Vector3(
      delta.dot(centerFrame.right),
      delta.dot(centerFrame.up),
      delta.dot(centerFrame.forward),
    );
  };

  const localPoint = (angleT, heightT, zT) => {
    const angleOffset = (angleT - 0.5) * hazard.angleSpan;
    const angle = hazard.angle + angleOffset;
    const z = hazard.z - hazard.zSpan * 0.5 + hazard.zSpan * zT;
    const frame = getSurfaceFrame(angle, z, inset);
    const topHeight = getCollapsedWallTopHeight(hazard, angleT) * heightScale;
    return toLocal(frame.root.clone().add(frame.up.clone().multiplyScalar(topHeight * heightT)));
  };

  const addGrid = (columns, rows, pointAt, flip = false) => {
    const start = vertices.length / 3;
    for (let row = 0; row <= rows; row += 1) {
      for (let column = 0; column <= columns; column += 1) {
        const point = pointAt(column / columns, row / rows);
        vertices.push(point.x, point.y, point.z);
      }
    }
    const stride = columns + 1;
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const a = start + row * stride + column;
        const b = a + 1;
        const c = a + stride;
        const d = c + 1;
        if (flip) {
          indices.push(a, b, c, b, d, c);
        } else {
          indices.push(a, c, b, b, c, d);
        }
      }
    }
  };

  addGrid(angleSegments, heightSegments, (angleT, heightT) => localPoint(angleT, heightT, 1), false);
  addGrid(angleSegments, heightSegments, (angleT, heightT) => localPoint(angleT, heightT, 0), true);
  addGrid(angleSegments, zSegments, (angleT, zT) => localPoint(angleT, 1, zT), false);
  addGrid(zSegments, heightSegments, (zT, heightT) => localPoint(0, heightT, zT), true);
  addGrid(zSegments, heightSegments, (zT, heightT) => localPoint(1, heightT, zT), false);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function getCollapsedWallTopHeight(hazard, angleT) {
  const knotHeight = sampleKnots(hazard.topKnots, THREE.MathUtils.clamp(angleT, 0, 1));
  const tornWave = Math.sin(angleT * TAU * 3.5 + hazard.phase) * 0.08;
  return hazard.wallHeight * THREE.MathUtils.clamp(knotHeight + tornWave, 0.62, 1.12);
}

function positionCollapsedWallBase(hazard) {
  const frame = getSurfaceFrame(hazard.angle, hazard.z, 0.06);
  const basis = new THREE.Matrix4().makeBasis(frame.right, frame.up, frame.forward);
  hazard.group.position.copy(frame.root);
  hazard.group.quaternion.setFromRotationMatrix(basis);
}

function updateCollapsedWallHazard(hazard, dt, time) {
  if (!hazard || hazard.hit) return;
  if (hazard.slab) {
    hazard.slab.material.emissiveIntensity = 0;
    hazard.slab.rotation.z = Math.sin(time * 1.8 + hazard.phase) * 0.015;
  }
  if (distance < START_CLEAR_DISTANCE) return;

  const angularDistance = Math.abs(angleDelta(player.angle, hazard.angle));
  const withinZ = Math.abs(player.z - hazard.z) < hazard.zSpan * 0.5 + getPlayerDepth() * 1.1;
  const withinAngle = angularDistance < hazard.angleSpan * 0.5 + getPlayerWidth();
  if (withinZ && withinAngle && hazard.wallHeight > PLAYER_CENTER_Y * 0.7) {
    hazard.hit = true;
    playImpactSound();
    crushPlayer();
    endRun("wall");
  }
}

function makeAshAsteroidHazard(leadingEdgeZ) {
  const angle = wrapAngle(player.angle + THREE.MathUtils.randFloatSpread(1.95));
  const radius = THREE.MathUtils.randFloat(0.62, 1.02);
  const z = leadingEdgeZ - THREE.MathUtils.randFloat(4, 10);
  const hazard = {
    kind: "ash",
    type: "ash-asteroid",
    angle,
    z,
    zSpan: radius * 3.1,
    angleSpan: (radius * 1.55) / TUBE_RADIUS,
    radius,
    phase: Math.random() * TAU,
    flySpeed: THREE.MathUtils.randFloat(8.2, 12.4),
    angleDrift: THREE.MathUtils.randFloatSpread(0.035),
    hit: false,
    smokeTimer: Math.random() * 0.2,
    group: new THREE.Group(),
  };

  hazardAngle = wrapAngle(angle + THREE.MathUtils.randFloatSpread(1.3));

  const core = new THREE.Mesh(shared.ashGeometry, shared.ashMaterial.clone());
  core.name = "cigarette-ash-asteroid";
  core.scale.set(radius * 1.18, radius * 0.92, radius);
  hazard.group.add(core);
  hazard.core = core;

  for (let i = 0; i < 7; i += 1) {
    const ember = new THREE.Mesh(shared.tobaccoClumpGeometry, shared.ashHotMaterial.clone());
    ember.name = "ash-hot-crack";
    const direction = new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(1),
      THREE.MathUtils.randFloatSpread(1),
      THREE.MathUtils.randFloatSpread(1),
    ).normalize();
    ember.position.copy(direction.multiplyScalar(radius * THREE.MathUtils.randFloat(0.42, 0.78)));
    ember.scale.setScalar(THREE.MathUtils.randFloat(0.12, 0.24));
    hazard.group.add(ember);
  }

  for (let i = 0; i < 4; i += 1) {
    const chip = new THREE.Mesh(shared.ashGeometry, shared.ashMaterial.clone());
    chip.name = "ash-chip";
    chip.position.set(
      THREE.MathUtils.randFloatSpread(radius * 1.2),
      THREE.MathUtils.randFloatSpread(radius * 1.0),
      THREE.MathUtils.randFloatSpread(radius * 1.2),
    );
    chip.scale.setScalar(THREE.MathUtils.randFloat(radius * 0.18, radius * 0.34));
    hazard.group.add(chip);
  }

  const hitbox = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.36, 14, 10),
    shared.ashHitboxMaterial.clone(),
  );
  hitbox.name = "ash-asteroid-hitbox";
  markDebugVisual(hitbox);
  hazard.group.add(hitbox);
  hazard.hitbox = hitbox;

  positionFloatingSurfaceObject(hazard, ASH_ASTEROID_SURFACE_INSET, 0.05);
  scene.add(hazard.group);
  return hazard;
}

function updateAshAsteroid(hazard, dt, time) {
  if (!hazard || hazard.hit) return;

  hazard.z += dt * (hazard.flySpeed + speed * 4.6);
  hazard.angle = wrapAngle(hazard.angle + hazard.angleDrift * dt + Math.sin(time * 1.8 + hazard.phase) * dt * 0.02);
  positionFloatingSurfaceObject(hazard, ASH_ASTEROID_SURFACE_INSET, Math.sin(time * 5 + hazard.phase) * 0.05);
  if (hazard.core) {
    hazard.core.rotation.x += dt * 2.2;
    hazard.core.rotation.y += dt * 1.4;
  }

  hazard.smokeTimer += dt;
  if (hazard.smokeTimer > 0.12) {
    hazard.smokeTimer = 0;
    const origin = hazard.group.localToWorld(new THREE.Vector3(0, 0, -hazard.radius * 0.8));
    addSmoke(origin, THREE.MathUtils.randFloat(0.18, 0.38), 0.16, shared.fireSmokeMaterial);
  }

  if (distance < START_CLEAR_DISTANCE) return;
  const dz = Math.abs(hazard.z - player.z);
  const angularDistance = Math.abs(angleDelta(player.angle, hazard.angle));
  if (dz < 46 && asteroidSoundCooldown <= 0) {
    playAsteroidWhooshSound(THREE.MathUtils.clamp(1 - dz / 46, 0.15, 1));
    asteroidSoundCooldown = 0.34;
  }
  const hitAngle = getPlayerWidth() + hazard.angleSpan * 1.1;
  if (dz < getPlayerDepth() * 1.4 + hazard.radius && angularDistance < hitAngle) {
    hazard.hit = true;
    crushPlayer();
    endRun("ash");
  }
}

function positionFloatingSurfaceObject(hazard, inset, lift) {
  const frame = getSurfaceFrame(hazard.angle, hazard.z, inset);
  const basis = new THREE.Matrix4().makeBasis(frame.right, frame.up, frame.forward);
  hazard.group.position.copy(frame.root).add(frame.up.clone().multiplyScalar(lift));
  hazard.group.quaternion.setFromRotationMatrix(basis);
}

function makeHandHazard(leadingEdgeZ) {
  const pathBiasedAngle = Math.random() < 0.68
    ? player.angle + THREE.MathUtils.randFloatSpread(1.35)
    : hazardAngle + THREE.MathUtils.randFloatSpread(2.7);
  const angle = wrapAngle(pathBiasedAngle);
  const handScale = THREE.MathUtils.randFloat(1.75, 2.25);
  const zSpan = THREE.MathUtils.randFloat(5.8, 8.6);
  const z = leadingEdgeZ - zSpan * 0.5;
  const proximityAngle = THREE.MathUtils.randFloat(0.94, 1.3);
  const proximityZ = THREE.MathUtils.randFloat(10.8, 15.2);
  const trackingAngle = proximityAngle + THREE.MathUtils.randFloat(0.78, 1.08);
  const trackingZ = proximityZ + THREE.MathUtils.randFloat(12, 18);
  const grabRadius = THREE.MathUtils.randFloat(1.24, 1.52);
  const hazard = {
    kind: "hand",
    type: "hand",
    angle,
    z,
    zSpan,
    angleSpan: proximityAngle,
    proximityAngle,
    proximityZ,
    trackingAngle,
    trackingZ,
    edgeLeftKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloat(0.74, 1.18)),
    edgeRightKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloat(0.74, 1.18)),
    edgeFrontKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloat(0.78, 1.16)),
    edgeBackKnots: Array.from({ length: 9 }, () => THREE.MathUtils.randFloat(0.78, 1.16)),
    grabRadius,
    handScale,
    bendSide: Math.random() > 0.5 ? 1 : -1,
    reachX: 0,
    reachY: PLAYER_CENTER_Y,
    reachZ: 0,
    aimX: 0,
    aimY: PLAYER_CENTER_Y,
    aimZ: 0,
    aimAmount: 0,
    reachAmount: 0,
    grabLift: 0,
    squeezeAmount: 0,
    grabbing: false,
    group: new THREE.Group(),
    bubbles: [],
  };

  hazardAngle = wrapAngle(angle + THREE.MathUtils.randFloatSpread(1.6));

  const baseJoint = new THREE.Mesh(shared.handJointGeometry, shared.handPalmMaterial.clone());
  baseJoint.name = "hand-anchor-joint";
  baseJoint.position.y = 0.18;
  baseJoint.scale.set(handScale * 1.36, handScale * 0.46, handScale * 1.36);
  hazard.group.add(baseJoint);

  const upperArm = new THREE.Mesh(shared.handWristGeometry, shared.handMaterial.clone());
  upperArm.name = "hand-upper-arm";
  hazard.group.add(upperArm);
  hazard.upperArm = upperArm;

  const elbow = new THREE.Mesh(shared.handJointGeometry, shared.handPalmMaterial.clone());
  elbow.name = "hand-elbow-joint";
  elbow.scale.setScalar(handScale * 1.02);
  hazard.group.add(elbow);
  hazard.elbow = elbow;

  const forearm = new THREE.Mesh(shared.handWristGeometry, shared.handMaterial.clone());
  forearm.name = "hand-forearm";
  hazard.group.add(forearm);
  hazard.forearm = forearm;

  const claw = new THREE.Group();
  claw.name = "claw";
  hazard.group.add(claw);
  hazard.claw = claw;

  buildHandPalm(claw, handScale);

  hazard.fingers = [];
  const fingerSpecs = [
    { x: -0.54, length: 1.08, radius: 0.95, spread: 0.42, z: -0.04 },
    { x: -0.18, length: 1.38, radius: 1.05, spread: 0.15, z: -0.08 },
    { x: 0.18, length: 1.72, radius: 1.12, spread: -0.06, z: -0.08 },
    { x: 0.54, length: 1.24, radius: 0.98, spread: -0.38, z: -0.02 },
  ];
  for (const spec of fingerSpecs) {
    hazard.fingers.push(addGloveFinger(claw, handScale, spec));
  }
  hazard.fingers.push(addGloveFinger(claw, handScale, {
    x: 0.74,
    y: -0.08,
    z: 0.15,
    length: 0.92,
    radius: 1.05,
    spread: -1.14,
    curlAxis: 0.62,
    thumb: true,
  }));

  const hitbox = new THREE.Mesh(shared.handHitboxGeometry, shared.handHitboxMaterial.clone());
  hitbox.name = "hand-grab-hitbox";
  markDebugVisual(hitbox);
  hitbox.scale.setScalar(grabRadius);
  claw.add(hitbox);
  hazard.hitbox = hitbox;

  const range = new THREE.Mesh(
    new THREE.BoxGeometry(proximityAngle * TUBE_RADIUS * 2, 4.2, proximityZ * 2),
    shared.handRangeMaterial.clone(),
  );
  range.name = "hand-proximity-range";
  markDebugVisual(range);
  range.position.y = 1.65;
  hazard.group.add(range);

  positionHandBase(hazard);
  addHandRangeCue(hazard);
  addHandBoundary(hazard);
  updateHandRig(hazard);
  scene.add(hazard.group);
  return hazard;
}

function buildHandPalm(claw, handScale) {
  const palmPlate = new THREE.Mesh(shared.handPalmGeometry, shared.handPalmMaterial.clone());
  palmPlate.name = "palm-plate";
  palmPlate.position.y = 0.02 * handScale;
  palmPlate.scale.set(handScale * 1.08, handScale * 0.78, handScale * 0.42);
  claw.add(palmPlate);

  const heelPad = new THREE.Mesh(shared.handPalmPadGeometry, shared.handPalmMaterial.clone());
  heelPad.name = "palm-heel-pad";
  heelPad.position.set(-0.02 * handScale, -0.48 * handScale, 0.07 * handScale);
  heelPad.scale.set(handScale * 1.18, handScale * 0.74, handScale * 0.52);
  claw.add(heelPad);

  const thumbPad = new THREE.Mesh(shared.handPalmPadGeometry, shared.handPalmMaterial.clone());
  thumbPad.name = "palm-thumb-pad";
  thumbPad.position.set(0.58 * handScale, -0.2 * handScale, 0.15 * handScale);
  thumbPad.rotation.z = -0.38;
  thumbPad.scale.set(handScale * 0.72, handScale * 1.02, handScale * 0.5);
  claw.add(thumbPad);

  for (const offset of [-0.46, -0.16, 0.16, 0.46]) {
    const knuckle = new THREE.Mesh(shared.handKnuckleGeometry, shared.handPalmMaterial.clone());
    knuckle.name = "palm-knuckle";
    knuckle.position.set(offset * handScale, 0.48 * handScale, 0.19 * handScale);
    knuckle.scale.set(handScale * 1.22, handScale * 0.76, handScale * 0.72);
    claw.add(knuckle);
  }

  for (let i = 0; i < 2; i += 1) {
    const cuff = new THREE.Mesh(shared.handCuffRingGeometry, shared.handPalmMaterial.clone());
    cuff.name = "soft-wrist-cuff";
    cuff.position.y = (-0.82 - i * 0.13) * handScale;
    cuff.rotation.x = Math.PI * 0.5;
    cuff.scale.setScalar(handScale * (1.14 - i * 0.08));
    claw.add(cuff);
  }
}

function addGloveFinger(claw, handScale, spec) {
  const finger = new THREE.Group();
  finger.name = spec.thumb ? "glove-thumb" : "glove-finger";
  finger.position.set(spec.x * handScale, (spec.y || 0.54) * handScale, (spec.z || 0) * handScale);
  finger.rotation.z = spec.spread;
  finger.rotation.x = spec.thumb ? 0.44 : 0.04;
  finger.userData.baseZ = finger.rotation.z;
  finger.userData.baseX = finger.rotation.x;
  finger.userData.curlAxis = spec.curlAxis || 1;

  const length = spec.length * handScale;
  const radius = spec.radius * handScale;
  const parts = [
    { y: length * 0.17, h: length * 0.36, r: 0.15 },
    { y: length * 0.48, h: length * 0.34, r: 0.135 },
    { y: length * 0.77, h: length * 0.3, r: 0.118 },
  ];

  for (const part of parts) {
    const segment = new THREE.Mesh(shared.handFingerGeometry, shared.handMaterial.clone());
    segment.position.y = part.y;
    segment.scale.set(radius * part.r * 8.8, part.h, radius * part.r * 8.8);
    finger.add(segment);
  }

  for (const y of [length * 0.34, length * 0.64]) {
    const pad = new THREE.Mesh(shared.handFingerPadGeometry, shared.handPalmMaterial.clone());
    pad.position.set(0, y, 0.025 * handScale);
    pad.scale.set(radius * 0.82, radius * 0.48, radius * 0.7);
    finger.add(pad);
  }

  const tip = new THREE.Mesh(shared.handFingerTipGeometry, shared.handPalmMaterial.clone());
  tip.position.y = length * 0.95;
  tip.scale.set(radius * 0.96, radius * 1.08, radius * 0.86);
  finger.add(tip);

  claw.add(finger);
  return finger;
}

function addHandRangeCue(hazard) {
  hazard.group.updateMatrixWorld(true);
  const geometry = createHandRangeCueGeometry(hazard, 18, 24);
  const cue = new THREE.Mesh(geometry, shared.handRangeFillMaterial.clone());
  cue.name = "hand-capture-ground-cue";
  cue.renderOrder = -1;
  hazard.group.add(cue);
  hazard.rangeCue = cue;
}

function createHandRangeCueGeometry(hazard, angleSegments, zSegments) {
  const vertices = [];
  const colors = [];
  const indices = [];
  const edgeColor = new THREE.Color(0x9b5a11);
  const centerColor = new THREE.Color(0xf0d25a);

  for (let i = 0; i <= zSegments; i += 1) {
    const zT = i / zSegments;
    const centerZ = THREE.MathUtils.lerp(-hazard.proximityZ, hazard.proximityZ, zT);
    const left = getHandZoneSideLimit(hazard, centerZ, -1);
    const right = getHandZoneSideLimit(hazard, centerZ, 1);

    for (let j = 0; j <= angleSegments; j += 1) {
      const aT = j / angleSegments;
      const angleOffset = THREE.MathUtils.lerp(-left, right, aT);
      const zLimit = getHandZoneZLimit(hazard, angleOffset);
      const zOffset = THREE.MathUtils.clamp(centerZ, -zLimit.back, zLimit.front);
      const angle = hazard.angle + angleOffset;
      const point = getSurfaceFrame(angle, hazard.z - zOffset, 0.025).root;
      const local = hazard.group.worldToLocal(point.clone());
      vertices.push(local.x, local.y, local.z);

      const edgeDistance = Math.max(Math.abs((aT - 0.5) * 2), Math.abs((zT - 0.5) * 2));
      const center = THREE.MathUtils.clamp(1 - edgeDistance, 0, 1) ** 0.55;
      const color = edgeColor.clone().lerp(centerColor, center);
      colors.push(color.r, color.g, color.b);
    }
  }

  const row = angleSegments + 1;
  for (let i = 0; i < zSegments; i += 1) {
    for (let j = 0; j < angleSegments; j += 1) {
      const a = i * row + j;
      const b = a + 1;
      const c = a + row;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function addHandBoundary(hazard) {
  hazard.group.updateMatrixWorld(true);
  const boundary = new THREE.Group();
  boundary.name = "hand-capture-boundary";

  const makeLine = (points) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, shared.handBoundaryMaterial.clone());
    boundary.add(line);
  };

  for (const side of [-1, 1]) {
    const points = [];
    for (let i = 0; i <= 28; i += 1) {
      const t = i / 28;
      const zOffset = THREE.MathUtils.lerp(-hazard.proximityZ, hazard.proximityZ, t);
      const angleLimit = getHandZoneSideLimit(hazard, zOffset, side);
      points.push(getBoundaryLocalPoint(hazard, hazard.angle + side * angleLimit, hazard.z - zOffset));
    }
    makeLine(points);
  }

  for (const edge of ["back", "front"]) {
    const points = [];
    for (let i = 0; i <= 42; i += 1) {
      const t = i / 42;
      const baseAngleOffset = THREE.MathUtils.lerp(-hazard.proximityAngle, hazard.proximityAngle, t);
      const zLimit = getHandZoneZLimit(hazard, baseAngleOffset);
      const zOffset = edge === "front" ? zLimit.front : -zLimit.back;
      const left = getHandZoneSideLimit(hazard, zOffset, -1);
      const right = getHandZoneSideLimit(hazard, zOffset, 1);
      const angleOffset = THREE.MathUtils.clamp(baseAngleOffset, -left, right);
      points.push(getBoundaryLocalPoint(hazard, hazard.angle + angleOffset, hazard.z - zOffset));
    }
    makeLine(points);
  }

  hazard.group.add(boundary);
  hazard.boundary = boundary;
}

function getBoundaryLocalPoint(hazard, angle, z) {
  const point = getSurfaceFrame(angle, z, 0.015).root;
  return hazard.group.worldToLocal(point.clone());
}

function getHandZoneSideLimit(hazard, localZ, side) {
  const t = THREE.MathUtils.clamp((localZ / hazard.proximityZ + 1) * 0.5, 0, 1);
  const knots = side < 0 ? hazard.edgeLeftKnots : hazard.edgeRightKnots;
  return hazard.proximityAngle * sampleKnots(knots, t);
}

function getHandZoneZLimit(hazard, angleOffset) {
  const left = getHandZoneSideLimit(hazard, 0, -1);
  const right = getHandZoneSideLimit(hazard, 0, 1);
  const t = THREE.MathUtils.clamp((angleOffset + left) / Math.max(0.001, left + right), 0, 1);
  return {
    front: hazard.proximityZ * sampleKnots(hazard.edgeFrontKnots, t),
    back: hazard.proximityZ * sampleKnots(hazard.edgeBackKnots, t),
  };
}

function isInsideHandZone(hazard, angleDistance, localZ, angleScale = 1, zScale = 1) {
  const sideLimit = getHandZoneSideLimit(hazard, localZ / Math.max(0.001, zScale), angleDistance < 0 ? -1 : 1) * angleScale;
  if (Math.abs(angleDistance) > sideLimit) return false;

  const zLimit = getHandZoneZLimit(hazard, angleDistance / Math.max(0.001, angleScale));
  const front = zLimit.front * zScale;
  const back = zLimit.back * zScale;
  return localZ <= front && localZ >= -back;
}

function positionHandBase(hazard) {
  const frame = getSurfaceFrame(hazard.angle, hazard.z, 0.05);
  const basis = new THREE.Matrix4().makeBasis(frame.right, frame.up, frame.forward);
  hazard.group.position.copy(frame.root);
  hazard.group.quaternion.setFromRotationMatrix(basis);
}

function updateHandHazard(hazard, dt) {
  if (hazard.grabbing) {
    updateHandRig(hazard);
    return;
  }

  positionHandBase(hazard);
  const angleDistance = angleDelta(player.angle, hazard.angle);
  const playerLocal = getPlayerTargetLocal(hazard);
  const localPlayerX = playerLocal.x;
  const localPlayerY = playerLocal.y;
  const localPlayerZ = playerLocal.z;
  const trackingAngleScale = hazard.trackingAngle / hazard.proximityAngle;
  const trackingZScale = hazard.trackingZ / hazard.proximityZ;
  const inTracking =
    distance >= START_CLEAR_DISTANCE &&
    isInsideHandZone(hazard, angleDistance, localPlayerZ, trackingAngleScale, trackingZScale);
  const inProximity =
    distance >= START_CLEAR_DISTANCE &&
    isInsideHandZone(hazard, angleDistance, localPlayerZ);

  const maxTrackX = hazard.trackingAngle * TUBE_RADIUS * 0.94;
  const maxTrackY = TUBE_RADIUS - 0.45;
  const maxTrackZ = hazard.trackingZ * 0.9;
  const targetAimX = inTracking ? THREE.MathUtils.clamp(localPlayerX, -maxTrackX, maxTrackX) : 0;
  const targetAimY = inTracking ? THREE.MathUtils.clamp(localPlayerY, 0.45, maxTrackY) : PLAYER_CENTER_Y;
  const targetAimZ = inTracking ? THREE.MathUtils.clamp(localPlayerZ, -maxTrackZ, maxTrackZ) : 0;

  hazard.aimAmount = THREE.MathUtils.lerp(hazard.aimAmount, inTracking ? 1 : 0, Math.min(1, dt * 5));
  hazard.aimX = THREE.MathUtils.lerp(hazard.aimX, targetAimX, Math.min(1, dt * (inTracking ? 6.3 : 2.4)));
  hazard.aimY = THREE.MathUtils.lerp(hazard.aimY, targetAimY, Math.min(1, dt * (inTracking ? 6.3 : 2.4)));
  hazard.aimZ = THREE.MathUtils.lerp(hazard.aimZ, targetAimZ, Math.min(1, dt * (inTracking ? 6.3 : 2.4)));

  const targetReach = inProximity ? 1 : inTracking ? 0.28 : 0;
  hazard.reachAmount = THREE.MathUtils.lerp(
    hazard.reachAmount,
    targetReach,
    Math.min(1, dt * (inProximity ? 6.2 : 3.1)),
  );
  const maxX = hazard.proximityAngle * TUBE_RADIUS * 0.96;
  const maxY = TUBE_RADIUS - 0.3;
  const maxZ = hazard.proximityZ * 0.94;
  const trackingLean = inTracking ? 0.22 : 0;
  const targetX = inProximity
    ? THREE.MathUtils.clamp(localPlayerX, -maxX, maxX)
    : hazard.aimX * trackingLean;
  const targetY = inProximity
    ? THREE.MathUtils.clamp(localPlayerY, 0.45, maxY)
    : THREE.MathUtils.lerp(PLAYER_CENTER_Y, hazard.aimY, trackingLean);
  const targetZ = inProximity
    ? THREE.MathUtils.clamp(localPlayerZ, -maxZ, maxZ)
    : hazard.aimZ * trackingLean;
  hazard.reachX = THREE.MathUtils.lerp(hazard.reachX, targetX, Math.min(1, dt * (inProximity ? 7.65 : 3.35)));
  hazard.reachY = THREE.MathUtils.lerp(hazard.reachY, targetY, Math.min(1, dt * (inProximity ? 7.65 : 3.35)));
  hazard.reachZ = THREE.MathUtils.lerp(hazard.reachZ, targetZ, Math.min(1, dt * (inProximity ? 7.65 : 3.35)));
  updateHandRig(hazard);
  poseHandFingers(hazard, hazard.reachAmount * 0.82);
  if ((inTracking || inProximity) && handSoundCooldown <= 0 && hazard.reachAmount > 0.12) {
    playHandMoveSound(hazard.reachAmount);
    handSoundCooldown = inProximity ? 0.28 : 0.48;
  }

  const distanceToPalm = playerLocal.distanceTo(getHandPalmLocal(hazard));
  if (inProximity && hazard.reachAmount > 0.46 && distanceToPalm < hazard.grabRadius + getPlayerWidth() * TUBE_RADIUS * 1.2) {
    startHandGrabScene(hazard);
  }
}

function updateHandRig(hazard) {
  const handScale = hazard.handScale || 1;
  const base = new THREE.Vector3(0, 0.2, 0);
  const palm = getHandPalmLocal(hazard);
  const bend = new THREE.Vector3(-palm.z, 0, palm.x);
  if (bend.lengthSq() < 0.001) {
    bend.set(hazard.bendSide, 0, 0);
  } else {
    bend.normalize().multiplyScalar(hazard.bendSide);
  }

  const bendStrength = (0.78 + handScale * 0.24) * (0.45 + hazard.aimAmount * 0.35 + hazard.reachAmount * 0.55);
  const elbow = new THREE.Vector3(
    palm.x * 0.42 + bend.x * bendStrength,
    THREE.MathUtils.lerp(1.28 + handScale * 0.2, 0.92 + handScale * 0.06, hazard.reachAmount) + hazard.grabLift * 0.45,
    palm.z * 0.38 + bend.z * bendStrength,
  );

  placeCylinderBetween(hazard.upperArm, base, elbow, handScale * 1.22);
  hazard.elbow.position.copy(elbow);
  hazard.elbow.scale.setScalar(handScale * (0.92 + hazard.reachAmount * 0.14));
  placeCylinderBetween(hazard.forearm, elbow, palm, handScale * 1.08);

  hazard.claw.position.copy(palm);
  const aimedAtPlayer = new THREE.Vector3(hazard.aimX, hazard.aimY, hazard.aimZ);
  const aimDirection = aimedAtPlayer.sub(palm);
  const fallbackDirection = palm.clone().sub(elbow);
  if (fallbackDirection.lengthSq() < 0.001) {
    fallbackDirection.copy(LOCAL_UP);
  }
  const direction = aimDirection.lengthSq() > 0.01 && hazard.aimAmount > 0.03
    ? aimDirection.normalize()
    : fallbackDirection.normalize();
  const blend = THREE.MathUtils.clamp(Math.max(hazard.aimAmount, hazard.reachAmount), 0, 1);
  const pointedDirection = LOCAL_UP.clone().lerp(direction, blend).normalize();
  if (pointedDirection.lengthSq() > 0.001) {
    hazard.claw.quaternion.setFromUnitVectors(LOCAL_UP, pointedDirection);
  }
  const squeeze = hazard.squeezeAmount || 0;
  hazard.claw.scale.set(1 - squeeze * 0.26, 1 - squeeze * 0.18, 1 - squeeze * 0.26);
}

function getHandPalmLocal(hazard) {
  const handScale = hazard.handScale || 1;
  const idleHeight = 1.82 + handScale * 0.35;
  const attackHeight = hazard.reachY || PLAYER_CENTER_Y;
  const y = THREE.MathUtils.lerp(idleHeight, attackHeight, hazard.reachAmount) + (hazard.grabLift || 0);
  return new THREE.Vector3(hazard.reachX, y, hazard.reachZ);
}

function poseHandFingers(hazard, curl) {
  const squeeze = hazard.squeezeAmount || 0;
  const amount = THREE.MathUtils.clamp(curl + squeeze * 0.55, 0, 1.35);
  for (const finger of hazard.fingers) {
    finger.rotation.x = (finger.userData.baseX || 0) + 0.16 - amount * 1.12 * (finger.userData.curlAxis || 1);
    finger.rotation.z = finger.userData.baseZ * (1 + amount * 0.38);
  }
}

function getPlayerTargetLocal(hazard) {
  const target = getPlayerTargetWorld();
  return hazard.group.worldToLocal(target.clone());
}

function getPlayerRootLocal(hazard) {
  const root = getSurfaceFrame(player.angle, player.z, 0.08).root;
  return hazard.group.worldToLocal(root.clone());
}

function getPlayerTargetWorld() {
  const frame = getSurfaceFrame(player.angle, player.z, 0.08);
  return frame.root.clone().add(frame.up.clone().multiplyScalar(PLAYER_CENTER_Y));
}

function placeCylinderBetween(mesh, start, end, thickness) {
  const direction = end.clone().sub(start);
  const length = Math.max(0.001, direction.length());
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.scale.set(thickness, length, thickness);
  mesh.quaternion.setFromUnitVectors(LOCAL_UP, direction.normalize());
}

function getAdaptationConfig() {
  return activeRunAdaptation?.config || DEFAULT_ADAPTATION_CONFIG;
}

function getEarlySupportFactor() {
  const elapsed = getRunElapsedSeconds();
  if (elapsed <= 60) return 1;
  if (elapsed >= 78) return 0;
  return 1 - (elapsed - 60) / 18;
}

function updateActiveSupportBuffTimer(dt) {
  if (state !== "running" || activeRunAdaptation.source !== "survey" || activeSupportBuffTimer <= 0) return;
  activeSupportBuffTimer = Math.max(0, activeSupportBuffTimer - dt);
  if (activeSupportBuffTimer > 0) return;
  activeRunAdaptation = createDefaultAdaptationState();
  applyRunAudioProfile();
  showSupportMessage("Support buff complete - standard run now.", 2.8);
}

function getEffectiveHazardDensityMultiplier() {
  const config = getAdaptationConfig();
  const early = getEarlySupportFactor();
  return THREE.MathUtils.clamp(
    config.hazardDensityMultiplier * THREE.MathUtils.lerp(1, config.earlyDifficultyMultiplier, early),
    0.42,
    1.25,
  );
}

function chooseWeightedHazard(weightedKinds, fallback = "tar") {
  const total = weightedKinds.reduce((sum, item) => sum + Math.max(0, item.weight), 0);
  if (total <= 0) return fallback;
  let roll = Math.random() * total;
  for (const item of weightedKinds) {
    roll -= Math.max(0, item.weight);
    if (roll <= 0) return item.kind;
  }
  return fallback;
}

function spawnHazard() {
  const aheadDistance = Math.abs(nextHazardEdgeZ - player.z);
  const canSpawnHand = aheadDistance > FIRST_HAZARD_DISTANCE + 24;
  const canSpawnSpecial = aheadDistance > FIRST_HAZARD_DISTANCE + 8;
  const canSpawnPowerup = canSpawnSpecial && canSpawnPowerupBox();
  const config = getAdaptationConfig();
  const density = getEffectiveHazardDensityMultiplier();
  const burdenSupport = config.gentleMode || config.calmMode || config.visualClarityBoost;
  const handReady = canSpawnHand && (hazardsSinceHand >= (burdenSupport ? 8 : 6) || Math.random() > (burdenSupport ? 0.96 : 0.9));
  const wallReady = canSpawnSpecial && hazardsSinceWall >= COLLAPSED_WALL_MIN_HAZARD_GAP;
  const hazardKind = chooseWeightedHazard([
    { kind: "powerup", weight: canSpawnPowerup ? 0.1 : 0 },
    { kind: "water", weight: canSpawnSpecial ? 0.17 * config.waterPickupMultiplier : 0 },
    { kind: "waterPool", weight: canSpawnSpecial ? 0.14 * config.waterPickupMultiplier : 0 },
    { kind: "ash", weight: canSpawnSpecial ? 0.15 * density : 0 },
    { kind: "wall", weight: wallReady ? 0.08 * density : 0 },
    { kind: "fire", weight: canSpawnSpecial ? 0.25 * config.tobaccoPileMultiplier : 0 },
    { kind: "hand", weight: handReady ? 0.1 * density : 0 },
    { kind: "tar", weight: 0.19 * density },
  ]);

  const hazard = hazardKind === "powerup"
    ? makePowerupBoxHazard(nextHazardEdgeZ)
    : hazardKind === "speedPad"
    ? makeSpeedPadHazard(nextHazardEdgeZ)
    : hazardKind === "water"
    ? makeWaterPickupHazard(nextHazardEdgeZ)
    : hazardKind === "waterPool"
    ? makeWaterPoolHazard(nextHazardEdgeZ)
    : hazardKind === "ash"
    ? makeAshAsteroidHazard(nextHazardEdgeZ)
    : hazardKind === "wall"
    ? makeCollapsedWallHazard(nextHazardEdgeZ)
    : hazardKind === "fire"
    ? makeFirePileHazard(nextHazardEdgeZ)
    : hazardKind === "hand"
    ? makeHandHazard(nextHazardEdgeZ)
    : makeTarHazard(nextHazardEdgeZ);
  obstacles.push(hazard);
  if (hazard.kind === "fire" || hazard.kind === "powerup") {
    spawnWaterFormationToward(hazard);
  }
  hazardsSinceHand = hazard.kind === "hand" ? 0 : hazardsSinceHand + (hazard.kind === "water" || hazard.kind === "waterPool" || hazard.kind === "powerup" || hazard.kind === "speedPad" ? 0 : 1);
  hazardsSinceWall = hazard.kind === "wall" ? 0 : hazardsSinceWall + (hazard.kind === "water" || hazard.kind === "waterPool" || hazard.kind === "powerup" || hazard.kind === "speedPad" ? 0 : 1);
  const gapMultiplier = THREE.MathUtils.clamp(1 / Math.max(0.45, density), 0.82, 1.85);
  nextHazardEdgeZ = hazard.z - hazard.zSpan * 0.5 - THREE.MathUtils.randFloat(
    hazard.kind === "hand" ? 46 : hazard.kind === "fire" ? 32 : hazard.kind === "ash" ? 24 : hazard.kind === "wall" ? 68 : hazard.kind === "waterPool" ? 18 : hazard.kind === "speedPad" ? 18 : hazard.kind === "water" ? 12 : hazard.kind === "powerup" ? 18 : 13,
    hazard.kind === "hand" ? 78 : hazard.kind === "fire" ? 54 : hazard.kind === "ash" ? 42 : hazard.kind === "wall" ? 108 : hazard.kind === "waterPool" ? 32 : hazard.kind === "speedPad" ? 32 : hazard.kind === "water" ? 24 : hazard.kind === "powerup" ? 34 : 25,
  ) * gapMultiplier;
}

function canSpawnPowerupBox() {
  if (powerupRoll) return false;
  return !activePowerup || activePowerup.type === "backpack";
}

function startRun() {
  if (state === "over" && !pendingSurveyResolved) {
    skipSurveyForNextRun();
  }
  activeRunAdaptation = consumeNextRunAdaptation();
  activeSupportBuffTimer = activeRunAdaptation.source === "survey"
    ? THREE.MathUtils.clamp(Number(activeRunAdaptation.durationSeconds || SUPPORT_BUFF_DURATION), 1, SUPPORT_BUFF_DURATION)
    : 0;
  currentRunNumber += 1;
  localStorage.setItem(RUN_NUMBER_KEY, String(currentRunNumber));
  startAudio({ music: true, audibleUnlock: true }).then((ready) => {
    if (!ready) return;
    applyRunAudioProfile();
    playButtonSound();
  });
  state = "running";
  grabScene = null;
  endCameraFreeze = null;
  runStartedAt = new Date();
  runStartedAtMs = performance.now();
  pendingRunStats = null;
  pendingSurveyResolved = true;
  resultAnimationToken += 1;
  menu.classList.add("hidden");
  tutorial.classList.add("hidden");
  gameOver.classList.add("hidden");
  if (supportMessageEl) supportMessageEl.classList.add("hidden");
  keys.clear();
  pointerDown = false;

  for (const obstacle of obstacles) {
    scene.remove(obstacle.group);
  }

  for (const puff of smoke) {
    smokeGroup.remove(puff.mesh);
  }
  for (const splash of splashes) {
    splashGroup.remove(splash.mesh);
  }
  clearSizeCallouts();
  clearWarningIndicators();
  clearMagnetSiphons();

  obstacles = [];
  smoke = [];
  splashes = [];
  distance = 0;
  speed = 1;
  moisture = MAX_MOISTURE;
  lastMoistureBand = getMoistureBand();
  extinguishedCount = 0;
  nextDistanceMilestone = getDistanceMilestoneStep();
  lastGuideDistance = -999;
  lastMoistureWarningAt = -999;
  activePowerup = null;
  powerupRoll = null;
  waterBackpackActive = false;
  updatePowerupUi();
  touchSteer = 0;
  activeTouchPointerId = null;
  activeTouchDirection = 0;
  updateMobileTouchZoneState(0);
  boostActive = false;
  boostPulse = 0;
  tarSoundCooldown = 0;
  handSoundCooldown = 0;
  asteroidSoundCooldown = 0;
  waterPoolSoundCooldown = 0;
  waterBopCooldown = 0;
  speedPadTimer = 0;
  speedPadSoundCooldown = 0;
  sideDashCooldown = 0;
  sideDashPulse = 0;
  lastSideTap = { left: -999, right: -999 };
  setTouchButtonActive(touchLeftButton, false);
  setTouchButtonActive(touchRightButton, false);
  setTouchButtonActive(touchBoostButton, false);
  hazardAngle = START_ANGLE;
  player.angle = START_ANGLE;
  player.targetAngle = START_ANGLE;
  player.slideVelocity = 0;
  player.tarContact = 0;
  player.crushed = false;
  player.z = 0;
  resetPlayerVisual();
  hazardsSinceHand = 0;
  hazardsSinceWall = COLLAPSED_WALL_MIN_HAZARD_GAP;
  nextHazardEdgeZ = player.z - FIRST_HAZARD_DISTANCE * THREE.MathUtils.clamp(1 / getEffectiveHazardDensityMultiplier(), 1, 1.6);

  while (nextHazardEdgeZ > player.z - SPAWN_AHEAD) {
    spawnHazard();
  }

  updateHud();
  announceActiveSupportBuffs();
}

function endRun(reason = "tar") {
  if (state !== "running") return;
  if (reason === "ash") {
    playAshHitSound();
  } else if (reason === "moisture") {
    playMoistureEmptySound();
  } else {
    playImpactSound();
  }
  finishRun(reason);
  if (reason !== "hand") {
    burstSmoke();
  }
}

function finishRun(reason = "tar") {
  stopMusic();
  clearWarningIndicators();
  clearMagnetSiphons();
  activePowerup = null;
  powerupRoll = null;
  activeSupportBuffTimer = 0;
  updatePowerupUi();
  endCameraFreeze = {
    position: camera.position.clone(),
    quaternion: camera.quaternion.clone(),
    up: camera.up.clone(),
  };
  grabScene = null;
  state = "over";
  best = Math.max(best, Math.floor(distance));
  localStorage.setItem(BEST_KEY, String(best));
  bestEl.textContent = `${best}m`;
  const finalDistance = Math.floor(distance);
  const openSeconds = getOpenSeconds();
  const runDuration = Math.max(0, Math.floor((performance.now() - runStartedAtMs) / 1000));
  pendingRunStats = {
    runNumber: currentRunNumber,
    runDuration,
    score: finalDistance,
    distance: finalDistance,
    extinguished: extinguishedCount,
  };
  finalScore.textContent = `${finalDistance}m`;
  const resultMessages = {
    hand: "The nicotine hand caught the droplet.",
    ash: "A cigarette ash asteroid ended the run.",
    wall: "A collapsed cigarette wall blocked the run.",
    moisture: "Moisture ran dry before the next water droplet.",
    tar: "You extinguished tobacco and kept moving through the cigarette.",
  };
  resultLine.textContent = resultMessages[reason] || resultMessages.tar;
  resetResultStats();
  playedAtEl.textContent = formatUkDateTime(runStartedAt || new Date());
  resetPostRunSurvey();
  gameOver.classList.remove("hidden");
  animateResultStats([
    { element: statDistanceEl, value: finalDistance, suffix: "m" },
    { element: statOpenTimeEl, value: openSeconds, suffix: "", formatter: formatDuration },
    { element: statExtinguishedEl, value: extinguishedCount, suffix: "" },
    { element: statBestEl, value: best, suffix: "m" },
  ]);
}

function getOpenSeconds() {
  return Math.max(0, Math.floor((performance.now() - gameOpenedAt) / 1000));
}

function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function cloneAdaptationConfig(config = DEFAULT_ADAPTATION_CONFIG) {
  return { ...DEFAULT_ADAPTATION_CONFIG, ...config };
}

function createDefaultAdaptationState() {
  return {
    source: "default",
    primaryBuffs: [],
    adaptations: [],
    durationSeconds: 0,
    config: cloneAdaptationConfig(),
  };
}

function getRunElapsedSeconds() {
  return runStartedAtMs ? Math.max(0, (performance.now() - runStartedAtMs) / 1000) : 0;
}

function getSurveyHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SURVEY_HISTORY_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function normalizeSymptomKey(symptom) {
  return SYMPTOM_KEY_ALIASES[symptom] || symptom;
}

function getSymptomDefinition(symptom) {
  const key = normalizeSymptomKey(symptom);
  return SYMPTOM_DEFINITIONS.find((item) => item.key === key) || SYMPTOM_DEFINITIONS[0];
}

function normalizeSurveyScores(scores = {}) {
  const normalized = {};
  for (const { key } of SYMPTOM_DEFINITIONS) {
    const externalKey = SYMPTOM_EXTERNAL_KEYS[key];
    normalized[key] = THREE.MathUtils.clamp(Number(scores[key] ?? scores[externalKey] ?? 0), 0, 10);
  }
  return normalized;
}

// Survey history stays local to the browser; nothing is uploaded or shared.
function saveSurveyEntry(scoresOrEntry, runStats = {}, adaptationGenerated = null, helped = "a_little") {
  const history = getSurveyHistory();
  let entry = scoresOrEntry;

  if (!entry?.timestamp || !entry?.symptoms) {
    const now = new Date();
    const symptoms = normalizeSurveyScores(scoresOrEntry);
    const selectedAdaptation = adaptationGenerated || selectNextRunAdaptations(symptoms, history);
    entry = {
      id: createUniqueId(),
      timestamp: now.toISOString(),
      dateLabel: getReadableDate(now),
      runNumber: runStats?.runNumber || currentRunNumber,
      runDuration: runStats?.runDuration || 0,
      score: runStats?.score || runStats?.distance || 0,
      distance: runStats?.distance || runStats?.score || 0,
      symptoms,
      helped,
      adaptationsSelected: selectedAdaptation.adaptations || [],
      adaptationGenerated: {
        primaryBuffs: selectedAdaptation.primaryBuffs || [],
        adaptations: selectedAdaptation.adaptations || [],
        config: selectedAdaptation.config || cloneAdaptationConfig(),
        symptomInterpretations: selectedAdaptation.symptomInterpretations || selectedAdaptation.symptomStates || {},
        baselines: selectedAdaptation.baselines || {},
        conflictResolution: selectedAdaptation.conflictResolution || {},
      },
    };
  }

  history.push(entry);
  localStorage.setItem(SURVEY_HISTORY_KEY, JSON.stringify(history.slice(-120)));
  return entry;
}

function hasBaseline(symptom, history = getSurveyHistory(), windowSize = BASELINE_WINDOW_SIZE) {
  const key = normalizeSymptomKey(symptom);
  return history.filter((entry) => Number.isFinite(Number(entry.symptoms?.[key]))).length >= windowSize;
}

function calculateRollingBaseline(symptom, history = getSurveyHistory(), windowSize = BASELINE_WINDOW_SIZE) {
  const key = normalizeSymptomKey(symptom);
  const recentScores = history
    .filter((entry) => Number.isFinite(Number(entry.symptoms?.[key])))
    .slice(-windowSize)
    .map((entry) => Number(entry.symptoms[key]));
  if (recentScores.length < windowSize) return null;
  return recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length;
}

function calculateSymptomBaselines(history = getSurveyHistory()) {
  const baselines = {};
  for (const { key } of SYMPTOM_DEFINITIONS) {
    baselines[key] = calculateRollingBaseline(key, history, BASELINE_WINDOW_SIZE);
  }
  return baselines;
}

function calculateElevationScore(symptom, currentScore, baseline) {
  if (baseline === null || baseline === undefined || !Number.isFinite(Number(baseline))) return null;
  return Number(currentScore || 0) - Number(baseline);
}

function getScoreBand(score) {
  const value = Number(score || 0);
  if (value >= 7) return "high";
  if (value >= 4) return "moderate";
  return "low";
}

function getBandWeight(band) {
  if (band === "high") return 2;
  if (band === "moderate") return 1;
  return 0;
}

function formatBandLabel(band) {
  return band.charAt(0).toUpperCase() + band.slice(1);
}

function interpretSymptom(symptom, currentScore, baseline) {
  const definition = getSymptomDefinition(symptom);
  const key = definition.key;
  const score = THREE.MathUtils.clamp(Number(currentScore || 0), 0, 10);
  const band = getScoreBand(score);
  const baselineEstablished = baseline !== null && baseline !== undefined && Number.isFinite(Number(baseline));
  const elevationScore = calculateElevationScore(key, score, baseline);
  const elevated = baselineEstablished && elevationScore >= 2;
  const baselineStatus = !baselineEstablished
    ? "Calibrating baseline"
    : band === "high" && elevated
    ? "High and elevated"
    : elevated
    ? "Elevated for you"
    : "Typical for you";
  const priorityScore = getBandWeight(band) + (elevated ? 1 : 0) + (SYMPTOM_RISK_WEIGHTS[key] || 0);

  return {
    symptom: key,
    key,
    externalKey: SYMPTOM_EXTERNAL_KEYS[key],
    label: definition.label,
    score,
    band,
    level: band,
    bandLabel: formatBandLabel(band),
    baseline: baselineEstablished ? Number(baseline) : null,
    baselineEstablished,
    baselineStatus,
    delta: baselineEstablished ? elevationScore : 0,
    elevationScore,
    elevated,
    supportSuggested: band !== "low" || elevated,
    priorityScore,
  };
}

function calculateAdaptationPriority(scores, baselines = {}) {
  const normalized = normalizeSurveyScores(scores);
  const interpretations = {};
  for (const { key } of SYMPTOM_DEFINITIONS) {
    interpretations[key] = interpretSymptom(key, normalized[key], baselines[key]);
  }
  return {
    scores: normalized,
    baselines,
    interpretations,
  };
}

function sortSymptomKeysByPriority(keys, interpretations) {
  return keys.slice().sort((a, b) => {
    const left = interpretations[a];
    const right = interpretations[b];
    return (right.priorityScore - left.priorityScore) || (right.score - left.score);
  });
}

function resolveAdaptationConflicts(priorityData) {
  const interpretations = priorityData.interpretations || priorityData;
  const overloadKeys = ["fatigue", "stress", "concentration"];
  const active = (key) => interpretations[key]?.supportSuggested;
  const highOrElevated = (key) => interpretations[key]?.band === "high" || interpretations[key]?.elevated;
  const overloadHighOrElevated = overloadKeys.filter(highOrElevated);
  const overloadActive = overloadKeys.filter(active);
  let primaryKey = "steady";

  if (overloadHighOrElevated.length > 0) {
    primaryKey = sortSymptomKeysByPriority(overloadHighOrElevated, interpretations)[0];
  } else if (highOrElevated("craving")) {
    primaryKey = "craving";
  } else if (highOrElevated("restlessness")) {
    primaryKey = "restlessness";
  } else {
    const supported = SYMPTOM_DEFINITIONS.map((item) => item.key).filter(active);
    if (supported.length > 0) {
      primaryKey = sortSymptomKeysByPriority(supported, interpretations)[0];
    }
  }

  const secondaryKeys = [];
  const addSecondary = (key) => {
    if (key !== primaryKey && !secondaryKeys.includes(key) && active(key)) secondaryKeys.push(key);
  };

  if (primaryKey !== "craving" && highOrElevated("craving")) {
    addSecondary("craving");
  } else if (primaryKey === "craving" && overloadActive.length > 0) {
    addSecondary(sortSymptomKeysByPriority(overloadActive, interpretations)[0]);
  } else if (primaryKey === "restlessness" && active("craving")) {
    addSecondary("craving");
  }

  return {
    primaryKey,
    secondaryKeys: secondaryKeys.slice(0, 1),
    overloadActive: overloadHighOrElevated.length > 0,
    overloadKeys: overloadHighOrElevated,
    restlessnessGetsFullStimulation: primaryKey === "restlessness" && overloadHighOrElevated.length === 0,
  };
}

function getAdaptationReason(interpretation) {
  const name = interpretation.label;
  if (!interpretation.baselineEstablished) {
    if (interpretation.band === "low") return `${name} was low while your baseline is still calibrating.`;
    return `${name} was ${interpretation.band}; your personal baseline is still calibrating.`;
  }
  if (interpretation.band === "high" && interpretation.elevated) return `${name} was high and elevated for you.`;
  if (interpretation.elevated) return `${name} was elevated for you.`;
  if (interpretation.band === "high") return `${name} was high but typical for you recently.`;
  if (interpretation.band === "moderate") return `${name} was moderate and support is suggested.`;
  return `${name} was low, so standard support is enough.`;
}

function getGameplayChangesForSymptom(key, interpretation, conflictResolution, subtle = false) {
  const strong = interpretation.band === "high" || interpretation.elevated;
  const scale = subtle ? 0.65 : 1;
  const changes = {
    first60SecondsDifficultyMultiplier: 1,
    hazardDensityMultiplier: 1,
    waterPickupMultiplier: 1,
    tobaccoPileMultiplier: 1,
    rewardFrequencyMultiplier: 1,
    warningTimeMultiplier: 1,
    warningStrength: "normal",
    speedMultiplier: 1,
    wallRunFrequencyMultiplier: 1,
  };

  if (key === "fatigue") {
    changes.first60SecondsDifficultyMultiplier = strong ? 0.58 : 0.78;
    changes.hazardDensityMultiplier = strong ? 0.72 : 0.88;
    changes.waterPickupMultiplier = 1 + (strong ? 0.38 : 0.18) * scale;
    changes.rewardFrequencyMultiplier = 1 + (strong ? 0.28 : 0.14) * scale;
    changes.warningTimeMultiplier = 1 + (strong ? 0.36 : 0.16) * scale;
    changes.warningStrength = strong ? "enhanced" : "normal";
    changes.speedMultiplier = strong ? 0.96 : 1;
    changes.gentleMode = true;
    changes.supportiveMessageMode = true;
  } else if (key === "stress") {
    changes.first60SecondsDifficultyMultiplier = strong ? 0.66 : 0.84;
    changes.hazardDensityMultiplier = strong ? 0.74 : 0.9;
    changes.waterPickupMultiplier = 1 + (strong ? 0.22 : 0.1) * scale;
    changes.rewardFrequencyMultiplier = 1 + (strong ? 0.16 : 0.08) * scale;
    changes.warningTimeMultiplier = 1 + (strong ? 0.35 : 0.16) * scale;
    changes.warningStrength = strong ? "enhanced" : "normal";
    changes.speedMultiplier = strong ? 0.98 : 1;
    changes.calmMode = true;
    changes.supportiveMessageMode = true;
  } else if (key === "concentration") {
    changes.first60SecondsDifficultyMultiplier = strong ? 0.7 : 0.86;
    changes.hazardDensityMultiplier = strong ? 0.68 : 0.88;
    changes.warningTimeMultiplier = 1 + (strong ? 0.8 : 0.28) * scale;
    changes.warningStrength = strong ? "strong" : "enhanced";
    changes.speedMultiplier = strong ? 0.94 : 0.98;
    changes.visualClarityBoost = true;
    changes.supportiveMessageMode = true;
  } else if (key === "craving") {
    changes.waterPickupMultiplier = 1 + (strong ? 0.58 : 0.22) * scale;
    changes.tobaccoPileMultiplier = 1 + (strong ? 0.48 : 0.2) * scale;
    changes.rewardFrequencyMultiplier = 1 + (strong ? 0.7 : 0.25) * scale;
    changes.warningTimeMultiplier = 1 + (strong ? 0.14 : 0.06) * scale;
    changes.coolingVisualBoost = true;
    changes.supportiveMessageMode = true;
  } else if (key === "restlessness") {
    const fullStimulation = conflictResolution.restlessnessGetsFullStimulation && !conflictResolution.overloadActive;
    changes.speedMultiplier = fullStimulation ? (strong ? 1.14 : 1.06) : 1.02;
    changes.wallRunFrequencyMultiplier = fullStimulation ? (strong ? 1.35 : 1.16) : 1.08;
    changes.rewardFrequencyMultiplier = 1 + (fullStimulation ? 0.14 : 0.08) * scale;
    changes.tobaccoPileMultiplier = fullStimulation ? 1.1 : 1;
    changes.supportiveMessageMode = true;
  }

  return changes;
}

function getBuffTemplateForSymptom(key) {
  const templates = {
    craving: {
      type: "craving",
      buffName: "Cooling Boost",
      description: "More water pickups, more extinguishable targets, and stronger cooling feedback.",
    },
    stress: {
      type: "calm",
      buffName: "Steady Flow",
      description: "Calmer pacing, smoother patterns, and more forgiving feedback.",
    },
    concentration: {
      type: "focus",
      buffName: "Clear Path",
      description: "Clearer warnings, fewer simultaneous hazards, and cleaner objective cues.",
    },
    restlessness: {
      type: "restlessness",
      buffName: "Momentum Run",
      description: "More movement rewards and a slightly faster rhythm when the run can tolerate it.",
    },
    fatigue: {
      type: "gentle",
      buffName: "Gentle Start",
      description: "An easier first 60 seconds, more small rewards, and more water support.",
    },
    steady: {
      type: "steady",
      buffName: "Steady Run",
      description: "Standard pacing with a small supportive start.",
    },
  };
  return templates[key] || templates.steady;
}

function buildAdaptationForSymptom(key, interpretation, conflictResolution, subtle = false) {
  const template = getBuffTemplateForSymptom(key);
  const changes = key === "steady"
    ? {
      first60SecondsDifficultyMultiplier: 1,
      hazardDensityMultiplier: 1,
      waterPickupMultiplier: 1,
      rewardFrequencyMultiplier: 1,
      warningStrength: "normal",
      speedMultiplier: 1,
    }
    : getGameplayChangesForSymptom(key, interpretation, conflictResolution, subtle);
  return {
    primarySymptom: SYMPTOM_EXTERNAL_KEYS[key] || key,
    symptomKey: key,
    type: template.type,
    buffName: template.buffName,
    title: template.buffName,
    reason: key === "steady" ? "Scores were low or typical, so no extra support was needed." : getAdaptationReason(interpretation),
    description: template.description,
    priority: interpretation?.priorityScore || 0,
    subtle,
    gameplayChanges: changes,
  };
}

function applyGameplayChangesToConfig(config, changes = {}) {
  if (Number.isFinite(changes.first60SecondsDifficultyMultiplier)) {
    config.earlyDifficultyMultiplier = Math.min(config.earlyDifficultyMultiplier, changes.first60SecondsDifficultyMultiplier);
  }
  if (Number.isFinite(changes.hazardDensityMultiplier)) {
    config.hazardDensityMultiplier = Math.min(config.hazardDensityMultiplier, changes.hazardDensityMultiplier);
  }
  if (Number.isFinite(changes.waterPickupMultiplier)) {
    config.waterPickupMultiplier = Math.max(config.waterPickupMultiplier, changes.waterPickupMultiplier);
  }
  if (Number.isFinite(changes.tobaccoPileMultiplier)) {
    config.tobaccoPileMultiplier = Math.max(config.tobaccoPileMultiplier, changes.tobaccoPileMultiplier);
  }
  if (Number.isFinite(changes.rewardFrequencyMultiplier)) {
    config.rewardFeedbackMultiplier = Math.max(config.rewardFeedbackMultiplier, changes.rewardFrequencyMultiplier);
  }
  if (Number.isFinite(changes.warningTimeMultiplier)) {
    config.warningTimeMultiplier = Math.max(config.warningTimeMultiplier, changes.warningTimeMultiplier);
  }
  if (Number.isFinite(changes.speedMultiplier)) {
    if (changes.speedMultiplier < 1) {
      config.movementIntensityMultiplier = Math.min(config.movementIntensityMultiplier, changes.speedMultiplier);
    } else {
      config.movementIntensityMultiplier = Math.max(config.movementIntensityMultiplier, changes.speedMultiplier);
    }
  }
  if (Number.isFinite(changes.wallRunFrequencyMultiplier)) {
    config.wallRunFrequencyMultiplier = Math.max(config.wallRunFrequencyMultiplier, changes.wallRunFrequencyMultiplier);
  }
  if (changes.warningStrength === "strong") config.warningTimeMultiplier = Math.max(config.warningTimeMultiplier, 1.8);
  if (changes.warningStrength === "enhanced") config.warningTimeMultiplier = Math.max(config.warningTimeMultiplier, 1.35);
  if (changes.visualClarityBoost) config.visualClarityBoost = true;
  if (changes.coolingVisualBoost) config.coolingVisualBoost = true;
  if (changes.calmMode) config.calmMode = true;
  if (changes.gentleMode) config.gentleMode = true;
  if (changes.supportiveMessageMode) config.supportiveMessageMode = true;
}

function clampAdaptationConfig(config) {
  config.waterPickupMultiplier = THREE.MathUtils.clamp(config.waterPickupMultiplier, 0.75, 1.8);
  config.tobaccoPileMultiplier = THREE.MathUtils.clamp(config.tobaccoPileMultiplier, 0.75, 1.65);
  config.rewardFeedbackMultiplier = THREE.MathUtils.clamp(config.rewardFeedbackMultiplier, 1, 1.85);
  config.earlyDifficultyMultiplier = THREE.MathUtils.clamp(config.earlyDifficultyMultiplier, 0.55, 1.1);
  config.hazardDensityMultiplier = THREE.MathUtils.clamp(config.hazardDensityMultiplier, 0.58, 1.2);
  config.warningTimeMultiplier = THREE.MathUtils.clamp(config.warningTimeMultiplier, 1, 2.2);
  config.movementIntensityMultiplier = THREE.MathUtils.clamp(config.movementIntensityMultiplier, 0.88, 1.16);
  config.wallRunFrequencyMultiplier = THREE.MathUtils.clamp(config.wallRunFrequencyMultiplier, 1, 1.4);
  return config;
}

function adaptationToBuff(adaptation) {
  return {
    type: adaptation.type,
    title: adaptation.buffName,
    description: `${adaptation.description} ${adaptation.reason}`,
    reason: adaptation.reason,
    priority: adaptation.priority,
    adaptation,
  };
}

// Gameplay support is based on recent self-report patterns. It is not a clinical assessment.
function selectNextRunAdaptations(scores, history = getSurveyHistory()) {
  const normalized = normalizeSurveyScores(scores);
  const baselines = calculateSymptomBaselines(history);
  const priorityData = calculateAdaptationPriority(normalized, baselines);
  const conflictResolution = resolveAdaptationConflicts(priorityData);
  const interpretations = priorityData.interpretations;
  const config = cloneAdaptationConfig();
  const adaptations = [];

  if (conflictResolution.primaryKey === "steady") {
    adaptations.push(buildAdaptationForSymptom("steady", { priorityScore: 0 }, conflictResolution));
  } else {
    adaptations.push(buildAdaptationForSymptom(conflictResolution.primaryKey, interpretations[conflictResolution.primaryKey], conflictResolution));
  }

  for (const key of conflictResolution.secondaryKeys) {
    adaptations.push(buildAdaptationForSymptom(key, interpretations[key], conflictResolution, true));
  }

  if (conflictResolution.overloadActive && interpretations.restlessness?.supportSuggested) {
    applyGameplayChangesToConfig(config, {
      speedMultiplier: 1,
      wallRunFrequencyMultiplier: 1.08,
      rewardFrequencyMultiplier: 1.08,
    });
  }

  for (const adaptation of adaptations) {
    applyGameplayChangesToConfig(config, adaptation.gameplayChanges);
  }
  clampAdaptationConfig(config);

  return {
    primaryBuffs: adaptations.map(adaptationToBuff).slice(0, 2),
    adaptations,
    config,
    symptomStates: interpretations,
    symptomInterpretations: interpretations,
    baselines,
    priorityData,
    conflictResolution,
  };
}

function generateAdaptationConfig(symptoms, history = getSurveyHistory()) {
  return selectNextRunAdaptations(symptoms, history);
}

function applyNextRunAdaptations(adaptationGenerated) {
  const generated = Array.isArray(adaptationGenerated)
    ? {
      primaryBuffs: adaptationGenerated.map(adaptationToBuff),
      adaptations: adaptationGenerated,
      config: adaptationGenerated.reduce((config, adaptation) => {
        applyGameplayChangesToConfig(config, adaptation.gameplayChanges || {});
        return config;
      }, cloneAdaptationConfig()),
    }
    : adaptationGenerated;

  if (!generated) {
    clearNextRunAdaptation();
    return;
  }

  localStorage.setItem(NEXT_ADAPTATION_KEY, JSON.stringify({
    createdAt: new Date().toISOString(),
    primaryBuffs: generated.primaryBuffs || [],
    adaptations: generated.adaptations || [],
    durationSeconds: SUPPORT_BUFF_DURATION,
    config: cloneAdaptationConfig(clampAdaptationConfig(generated.config || cloneAdaptationConfig())),
  }));
}

function applyAdaptationConfigToNextRun(adaptationGenerated) {
  applyNextRunAdaptations(adaptationGenerated);
}

function consumeNextRunAdaptation() {
  try {
    const saved = JSON.parse(localStorage.getItem(NEXT_ADAPTATION_KEY) || "null");
    localStorage.removeItem(NEXT_ADAPTATION_KEY);
    if (!saved || !saved.config) return createDefaultAdaptationState();
    return {
      source: "survey",
      primaryBuffs: Array.isArray(saved.primaryBuffs) ? saved.primaryBuffs : [],
      adaptations: Array.isArray(saved.adaptations) ? saved.adaptations : [],
      durationSeconds: Number(saved.durationSeconds || SUPPORT_BUFF_DURATION),
      config: cloneAdaptationConfig(saved.config),
    };
  } catch (error) {
    localStorage.removeItem(NEXT_ADAPTATION_KEY);
    return createDefaultAdaptationState();
  }
}

function clearNextRunAdaptation() {
  localStorage.removeItem(NEXT_ADAPTATION_KEY);
}

function getReadableDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  }).format(date);
}

function createUniqueId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `survey-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getCurrentSurveyValues() {
  const symptoms = {};
  for (const { key } of SYMPTOM_DEFINITIONS) {
    symptoms[key] = Number(symptomControls[key]?.input?.value || 0);
  }
  return symptoms;
}

function updateSymptomSurveyValues() {
  for (const { key } of SYMPTOM_DEFINITIONS) {
    const control = symptomControls[key];
    if (control?.input && control?.value) {
      control.value.textContent = control.input.value;
    }
  }
}

function resetPostRunSurvey() {
  pendingSurveyResolved = false;
  if (gameOver) {
    gameOver.classList.add("survey-active");
    gameOver.classList.remove("reward-active");
  }
  if (surveySection) {
    surveySection.classList.add("awaiting-survey");
    surveySection.classList.remove("reward-mode");
  }
  if (symptomSurveyForm) {
    symptomSurveyForm.classList.remove("hidden");
    symptomSurveyForm.reset();
  }
  if (submitSurveyButton) submitSurveyButton.textContent = "CLAIM STARTING BUFF";
  if (restartButton) restartButton.textContent = "RUN AGAIN";
  for (const { key } of SYMPTOM_DEFINITIONS) {
    if (symptomControls[key]?.input) symptomControls[key].input.value = "0";
  }
  updateSymptomSurveyValues();
  if (nextBuffRouletteTimer) {
    window.clearInterval(nextBuffRouletteTimer);
    nextBuffRouletteTimer = null;
  }
  if (nextBuffPanel) {
    nextBuffPanel.classList.add("hidden");
    nextBuffPanel.classList.remove("rolling", "landed", "skipped");
  }
  if (nextBuffList) nextBuffList.innerHTML = "";
  if (nextBuffBox) {
    const prizeText = nextBuffBox.querySelector("span");
    if (prizeText) prizeText.textContent = "?";
  }
  if (nextBuffRoulette) nextBuffRoulette.textContent = "ROLLING";
  if (nextBuffHint) nextBuffHint.textContent = `Support buff lasts for the first ${SUPPORT_BUFF_DURATION} seconds of your next run.`;
}

function getBuffShortLabel(buff = {}) {
  const labels = {
    craving: "COOLING BOOST",
    focus: "CLEAR PATH",
    gentle: "GENTLE START",
    calm: "STEADY FLOW",
    restlessness: "MOMENTUM RUN",
    steady: "STEADY RUN",
  };
  return labels[buff.type] || (buff.title || "SUPPORT BUFF").replace(/\s+BUFF$/i, "").toUpperCase();
}

function getBuffIconType(buff = {}) {
  const icons = {
    craving: "craving",
    focus: "focus",
    gentle: "gentle",
    calm: "calm",
    restlessness: "restlessness",
    steady: "steady",
    standard: "standard",
  };
  if (/standard/i.test(buff.title || "")) return "standard";
  return icons[buff.type] || "steady";
}

function getBuffIconMarkup(buff = {}) {
  const type = getBuffIconType(buff);
  const icons = {
    craving: `
      <svg class="buff-icon-svg" viewBox="0 0 120 120" aria-hidden="true">
        <path class="icon-fill icon-water" d="M60 9C44 34 28 50 28 73c0 24 15 38 32 38s32-14 32-38C92 50 76 34 60 9Z"/>
        <path class="icon-shine" d="M48 42c-7 9-10 18-10 28"/>
        <path class="icon-line" d="M28 85c15 8 49 8 64 0M35 97c12 6 38 6 50 0"/>
      </svg>`,
    focus: `
      <svg class="buff-icon-svg" viewBox="0 0 120 120" aria-hidden="true">
        <path class="icon-fill icon-focus" d="M14 60s17-27 46-27 46 27 46 27-17 27-46 27S14 60 14 60Z"/>
        <circle class="icon-cut" cx="60" cy="60" r="21"/>
        <circle class="icon-fill icon-focus-dot" cx="60" cy="60" r="10"/>
        <path class="icon-line" d="M60 21v15M60 84v15M21 60h15M84 60h15"/>
      </svg>`,
    gentle: `
      <svg class="buff-icon-svg" viewBox="0 0 120 120" aria-hidden="true">
        <path class="icon-fill icon-gentle" d="M60 12l39 16v28c0 25-16 43-39 53-23-10-39-28-39-53V28l39-16Z"/>
        <path class="icon-cut" d="M54 36h12v18h18v12H66v18H54V66H36V54h18V36Z"/>
      </svg>`,
    calm: `
      <svg class="buff-icon-svg" viewBox="0 0 120 120" aria-hidden="true">
        <circle class="icon-fill icon-calm" cx="60" cy="60" r="42"/>
        <path class="icon-line calm-line" d="M22 50c12-12 24 12 36 0s24 12 40 0"/>
        <path class="icon-line calm-line" d="M22 66c12-12 24 12 36 0s24 12 40 0"/>
        <path class="icon-line calm-line" d="M22 82c12-12 24 12 36 0s24 12 40 0"/>
      </svg>`,
    restlessness: `
      <svg class="buff-icon-svg" viewBox="0 0 120 120" aria-hidden="true">
        <path class="icon-fill icon-flow" d="M21 24l34 36-34 36 14 14 48-50-48-50-14 14Z"/>
        <path class="icon-fill icon-flow icon-flow-light" d="M62 24l34 36-34 36 14 14 48-50-48-50-14 14Z"/>
        <path class="icon-line" d="M15 36h24M9 60h36M15 84h24"/>
      </svg>`,
    steady: `
      <svg class="buff-icon-svg" viewBox="0 0 120 120" aria-hidden="true">
        <circle class="icon-fill icon-steady" cx="60" cy="60" r="44"/>
        <path class="icon-cut icon-check" d="M50 78L30 58l9-9 12 12 30-31 9 9-40 39Z"/>
      </svg>`,
    standard: `
      <svg class="buff-icon-svg" viewBox="0 0 120 120" aria-hidden="true">
        <circle class="icon-fill icon-standard" cx="60" cy="60" r="42"/>
        <path class="icon-line" d="M35 60h50M60 35v50"/>
      </svg>`,
  };
  return `<span class="buff-icon buff-icon-${type}">${icons[type]}</span>`;
}

function setBuffPrizeContent(content, html = false) {
  if (!nextBuffBox) return;
  const prizeText = nextBuffBox.querySelector("span");
  if (!prizeText) return;
  if (html) {
    prizeText.innerHTML = content;
  } else {
    prizeText.textContent = content;
  }
}

function getBuffRevealDescription(buff = {}) {
  if (!buff || !buff.description) {
    return `Support buff lasts for the first ${SUPPORT_BUFF_DURATION} seconds of your next run.`;
  }
  return `${buff.description} Active for the first ${SUPPORT_BUFF_DURATION} seconds of your next run.`;
}

function startNextBuffRoulette(visibleBuffs) {
  if (!nextBuffPanel || !nextBuffRoulette) return;
  if (nextBuffRouletteTimer) {
    window.clearInterval(nextBuffRouletteTimer);
    nextBuffRouletteTimer = null;
  }

  const reel = [
    "COOLING BOOST",
    "CLEAR PATH",
    "GENTLE START",
    "STEADY FLOW",
    "MOMENTUM RUN",
    "STEADY RUN",
    "WATER REWARD",
    "CLEAR WARNINGS",
  ];
  const finalBuff = visibleBuffs[0] || { title: "Support Buff", description: "A balanced starting boost is ready." };
  const finalLabel = getBuffShortLabel(finalBuff);
  let tick = 0;
  nextBuffRoulette.textContent = reel[0];
  nextBuffPanel.classList.add("rolling");
  nextBuffPanel.classList.remove("landed");
  if (nextBuffHint) nextBuffHint.textContent = "Purple support box dropping...";
  setBuffPrizeContent("?");

  nextBuffRouletteTimer = window.setInterval(() => {
    tick += 1;
    nextBuffRoulette.textContent = reel[tick % reel.length];
    setBuffPrizeContent(tick % 2 === 0 ? "?" : reel[tick % reel.length].slice(0, 2));
    playRouletteTickSound();
    if (tick >= 19) {
      window.clearInterval(nextBuffRouletteTimer);
      nextBuffRouletteTimer = null;
      nextBuffRoulette.textContent = finalLabel;
      setBuffPrizeContent(getBuffIconMarkup(finalBuff), true);
      nextBuffPanel.classList.remove("rolling");
      nextBuffPanel.classList.add("landed");
      if (nextBuffHint) {
        nextBuffHint.textContent = getBuffRevealDescription(finalBuff);
      }
      playNextBuffRevealSound();
    }
  }, 105);
}

function showBuffPanel(buffs, skipped = false) {
  if (!nextBuffPanel || !nextBuffList) return;
  if (gameOver) {
    gameOver.classList.remove("survey-active");
    gameOver.classList.add("reward-active");
  }
  if (surveySection) {
    surveySection.classList.remove("awaiting-survey");
    surveySection.classList.add("reward-mode");
  }
  if (nextBuffRouletteTimer) {
    window.clearInterval(nextBuffRouletteTimer);
    nextBuffRouletteTimer = null;
  }
  nextBuffList.innerHTML = "";
  const visibleBuffs = skipped || buffs.length === 0
    ? [{ title: "Standard Next Run", description: "No personalised support buff will be used." }]
    : buffs.slice(0, 1);
  if (nextBuffHeading) {
    nextBuffHeading.textContent = skipped
      ? "Survey Skipped"
      : "Starting Buff Unlocked";
  }
  nextBuffPanel.classList.remove("rolling", "landed", "skipped");
  nextBuffPanel.classList.remove("hidden");
  if (skipped) {
    nextBuffPanel.classList.add("skipped");
    setBuffPrizeContent(getBuffIconMarkup({ type: "standard", title: "Standard Next Run" }), true);
    nextBuffPanel.classList.add("landed");
    if (nextBuffRoulette) nextBuffRoulette.textContent = "STANDARD";
    if (nextBuffHint) nextBuffHint.textContent = "No support buff will be used on the next run.";
    return;
  }
  startNextBuffRoulette(visibleBuffs);
}

function saveCurrentSurvey() {
  if (!pendingRunStats) return null;
  const history = getSurveyHistory();
  const symptoms = getCurrentSurveyValues();
  const adaptationGenerated = selectNextRunAdaptations(symptoms, history);
  const helpedInput = symptomSurveyForm?.querySelector("input[name='helped']:checked");
  const entry = saveSurveyEntry(symptoms, pendingRunStats, adaptationGenerated, helpedInput?.value || "a_little");
  applyNextRunAdaptations(adaptationGenerated);
  pendingSurveyResolved = true;
  if (symptomSurveyForm) symptomSurveyForm.classList.add("hidden");
  showBuffPanel(adaptationGenerated.primaryBuffs);
  renderProgressGraph();
  return entry;
}

function skipSurveyForNextRun() {
  if (pendingSurveyResolved) return;
  pendingSurveyResolved = true;
  clearNextRunAdaptation();
  if (surveySection) surveySection.classList.remove("awaiting-survey");
  if (symptomSurveyForm) symptomSurveyForm.classList.add("hidden");
  showBuffPanel([], true);
}

function showSupportMessage(message, duration = 3.4) {
  if (!supportMessageEl || !message) return;
  supportMessageEl.textContent = message;
  supportMessageEl.classList.remove("hidden", "pop");
  void supportMessageEl.offsetWidth;
  supportMessageEl.classList.add("pop");
  supportMessageTimer = duration;
}

function announceActiveSupportBuffs() {
  if (!activeRunAdaptation.primaryBuffs.length) return;
  const buffTypes = new Set(activeRunAdaptation.primaryBuffs.map((buff) => buff.type));
  const timedSuffix = activeSupportBuffTimer > 0 ? ` ${Math.ceil(activeSupportBuffTimer)}s support window.` : "";
  if (buffTypes.has("craving")) {
    showSupportMessage(`Craving wave detected - cool it down.${timedSuffix}`, 4.2);
  } else if (buffTypes.has("focus")) {
    showSupportMessage(`Focus support active - clearer warnings ahead.${timedSuffix}`, 4);
  } else if (buffTypes.has("gentle")) {
    showSupportMessage(`Gentle support active - forgiving start unlocked.${timedSuffix}`, 4);
  } else if (buffTypes.has("restlessness")) {
    showSupportMessage(`Flow support active - channel the movement.${timedSuffix}`, 4);
  } else {
    showSupportMessage(`${activeRunAdaptation.primaryBuffs[0].title} active.${timedSuffix}`, 3.8);
  }
}

function updateSupportMessage(dt) {
  if (!supportMessageEl || supportMessageEl.classList.contains("hidden")) return;
  supportMessageTimer -= dt;
  if (supportMessageTimer <= 0) {
    supportMessageEl.classList.add("hidden");
  }
}

function applyRunAudioProfile() {
  if (!musicGain || !audioCtx) return;
  const calm = activeRunAdaptation.config.calmMode || activeRunAdaptation.config.gentleMode;
  musicGain.gain.setTargetAtTime(calm ? 0.22 : 0.32, audioCtx.currentTime, 0.08);
}

function openProgressScreen() {
  if (!progressOverlay) return;
  progressOverlay.classList.remove("hidden", "screenshot-ready");
  if (screenshotProgressButton) screenshotProgressButton.textContent = "Screenshot for GP";
  renderProgressGraph();
}

function closeProgressScreen() {
  if (!progressOverlay) return;
  progressOverlay.classList.add("hidden");
}

function getSurveyEntryDate(entry) {
  const rawDate = entry?.timestamp || entry?.dateLabel;
  if (!rawDate) return null;
  const date = new Date(rawDate);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getFilteredSurveyHistory(history = getSurveyHistory()) {
  const range = PROGRESS_RANGES[progressRange] || PROGRESS_RANGES.week;
  const cutoff = Date.now() - range.days * 24 * 60 * 60 * 1000;
  return history.filter((entry) => {
    const date = getSurveyEntryDate(entry);
    return date && date.getTime() >= cutoff;
  });
}

function updateProgressRangeButtons() {
  for (const button of progressRangeButtons) {
    button.classList.toggle("active", button.dataset.progressRange === progressRange);
  }
}

function formatProgressSessionDate(entry) {
  const date = getSurveyEntryDate(entry);
  return date ? formatUkDateTime(date) : (entry?.dateLabel || "--/--/----, --:--");
}

function formatProgressAxisDate(entry) {
  const date = getSurveyEntryDate(entry);
  if (!date) return "--/--";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  }).format(date);
}

function renderProgressGraph(history = getSurveyHistory()) {
  renderProgressChart(history);
}

function renderProgressChart(historyOverride = null) {
  const allHistory = Array.isArray(historyOverride) ? historyOverride : getSurveyHistory();
  const history = getFilteredSurveyHistory(allHistory);
  updateProgressRangeButtons();
  renderProgressSummary(history, allHistory);
  renderProgressInterpretations(history, allHistory);
  renderProgressSessions(history);
  renderChartLegend();
  if (!symptomChart) return;
  const ctx = symptomChart.getContext("2d");
  const width = symptomChart.width;
  const height = symptomChart.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fffaf0";
  ctx.fillRect(0, 0, width, height);

  const padding = { left: 58, right: 26, top: 28, bottom: 76 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  ctx.strokeStyle = "rgba(20, 17, 14, 0.72)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, padding.top + chartHeight);
  ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
  ctx.stroke();

  ctx.font = "16px Arial";
  ctx.fillStyle = "#14110e";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let value = 0; value <= 10; value += 2) {
    const y = padding.top + chartHeight - (value / 10) * chartHeight;
    ctx.strokeStyle = "rgba(20, 17, 14, 0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + chartWidth, y);
    ctx.stroke();
    ctx.fillText(String(value), padding.left - 10, y);
  }

  if (history.length === 0) {
    ctx.textAlign = "center";
    ctx.font = "24px Arial";
    const message = allHistory.length === 0
      ? "Complete a post-run check-in to start the progress chart."
      : `No check-ins found for ${PROGRESS_RANGES[progressRange].label.toLowerCase()}.`;
    ctx.fillText(message, width / 2, height / 2);
    return;
  }

  const xFor = (index) => {
    if (history.length === 1) return padding.left + chartWidth / 2;
    return padding.left + (index / (history.length - 1)) * chartWidth;
  };
  const yFor = (score) => padding.top + chartHeight - (THREE.MathUtils.clamp(score, 0, 10) / 10) * chartHeight;

  for (const symptom of SYMPTOM_DEFINITIONS) {
    ctx.strokeStyle = symptom.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    history.forEach((entry, index) => {
      const x = xFor(index);
      const y = yFor(Number(entry.symptoms?.[symptom.key] || 0));
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.fillStyle = symptom.color;
    history.forEach((entry, index) => {
      const x = xFor(index);
      const y = yFor(Number(entry.symptoms?.[symptom.key] || 0));
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, TAU);
      ctx.fill();
    });
  }

  ctx.fillStyle = "#14110e";
  ctx.font = "13px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const labelEvery = Math.max(1, Math.ceil(history.length / 6));
  history.forEach((entry, index) => {
    if (index % labelEvery !== 0 && index !== history.length - 1) return;
    const x = xFor(index);
    ctx.fillText(`Session ${entry.runNumber || index + 1}`, x, padding.top + chartHeight + 10);
    ctx.fillText(formatProgressAxisDate(entry), x, padding.top + chartHeight + 28);
  });
}

function renderProgressInterpretations(history = getFilteredSurveyHistory(), allHistory = getSurveyHistory()) {
  if (!progressInterpretations) return;
  const latest = history[history.length - 1];
  if (!latest) {
    progressInterpretations.innerHTML = "";
    return;
  }
  const latestIndex = allHistory.findIndex((entry) => entry.id && entry.id === latest.id);
  const previousHistory = latestIndex >= 0 ? allHistory.slice(0, latestIndex) : allHistory.slice(0, -1);
  const baselines = calculateSymptomBaselines(previousHistory);
  const priorityData = calculateAdaptationPriority(latest.symptoms || {}, baselines);
  const cards = SYMPTOM_DEFINITIONS.map(({ key, label }) => {
    const interpretation = priorityData.interpretations[key];
    const baselineText = interpretation.baselineEstablished
      ? `Baseline ${interpretation.baseline.toFixed(1)}`
      : "Calibrating baseline";
    return `
      <div>
        <span>${label}</span>
        <strong>${interpretation.score}/10</strong>
        <small>${interpretation.bandLabel} - ${interpretation.baselineStatus}</small>
        <em>${baselineText}</em>
      </div>
    `;
  }).join("");
  progressInterpretations.innerHTML = `
    <h3>Latest Support Read</h3>
    <div class="progress-interpretation-grid">${cards}</div>
  `;
}

function renderProgressSummary(history = getFilteredSurveyHistory(), allHistory = getSurveyHistory()) {
  if (!progressSummary) return;
  const latest = history[history.length - 1];
  const recent = history.slice(-5);
  const avg = (key) => {
    if (recent.length === 0) return "--";
    const value = recent.reduce((sum, entry) => sum + Number(entry.symptoms?.[key] || 0), 0) / recent.length;
    return value.toFixed(1);
  };
  progressSummary.innerHTML = `
    <div><span>Total tracked sessions</span><strong>${allHistory.length}</strong></div>
    <div><span>Shown in range</span><strong>${history.length}</strong></div>
    <div><span>Latest session</span><strong>${latest ? `#${latest.runNumber || history.length}` : "--"}</strong></div>
    <div><span>Latest date and time</span><strong>${latest ? formatProgressSessionDate(latest) : "--"}</strong></div>
    <div><span>Latest craving</span><strong>${latest?.symptoms ? latest.symptoms.craving : "--"}</strong></div>
    <div><span>Avg craving last 5</span><strong>${avg("craving")}</strong></div>
    <div><span>Latest fatigue</span><strong>${latest?.symptoms ? latest.symptoms.fatigue : "--"}</strong></div>
    <div><span>Avg fatigue last 5</span><strong>${avg("fatigue")}</strong></div>
  `;
}

function renderProgressSessions(history = getFilteredSurveyHistory()) {
  if (!progressSessions) return;
  if (history.length === 0) {
    progressSessions.innerHTML = `<p>No sessions found for ${PROGRESS_RANGES[progressRange].label.toLowerCase()}.</p>`;
    return;
  }
  const rows = history.slice().reverse().map((entry, index) => {
    const fallbackNumber = history.length - index;
    const symptoms = entry.symptoms || {};
    return `
      <tr>
        <td>Session ${entry.runNumber || fallbackNumber}</td>
        <td>${formatProgressSessionDate(entry)}</td>
        <td>${symptoms.craving ?? "--"}</td>
        <td>${symptoms.stress ?? "--"}</td>
        <td>${symptoms.concentration ?? "--"}</td>
        <td>${symptoms.restlessness ?? "--"}</td>
        <td>${symptoms.fatigue ?? "--"}</td>
      </tr>
    `;
  }).join("");
  progressSessions.innerHTML = `
    <h3>Sessions In View</h3>
    <div class="progress-session-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Session Number</th>
            <th>Date and Time</th>
            <th>Craving</th>
            <th>Stress</th>
            <th>Focus</th>
            <th>Restless</th>
            <th>Fatigue</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderChartLegend() {
  if (!chartLegend) return;
  chartLegend.innerHTML = "";
  for (const symptom of SYMPTOM_DEFINITIONS) {
    const item = document.createElement("span");
    const line = document.createElement("i");
    line.style.background = symptom.color;
    item.append(line, document.createTextNode(symptom.label));
    chartLegend.appendChild(item);
  }
}

function openResetStatsModal() {
  if (!resetStatsModal) return;
  resetStatsModal.classList.remove("hidden");
  if (resetStatsConfirmInput) {
    resetStatsConfirmInput.value = "";
    window.setTimeout(() => resetStatsConfirmInput.focus(), 0);
  }
  if (confirmResetStatsButton) confirmResetStatsButton.disabled = true;
}

function closeResetStatsModal() {
  if (!resetStatsModal) return;
  resetStatsModal.classList.add("hidden");
  if (resetStatsConfirmInput) resetStatsConfirmInput.value = "";
  if (confirmResetStatsButton) confirmResetStatsButton.disabled = true;
}

function updateResetStatsConfirmState() {
  if (!confirmResetStatsButton || !resetStatsConfirmInput) return;
  confirmResetStatsButton.disabled = resetStatsConfirmInput.value.trim() !== "YES";
}

function resetSymptomStatistics() {
  if (!resetStatsConfirmInput || resetStatsConfirmInput.value.trim() !== "YES") return;
  localStorage.removeItem(SURVEY_HISTORY_KEY);
  clearNextRunAdaptation();
  closeResetStatsModal();
  renderProgressGraph();
}

function formatUkDateTime(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  }).format(date);
}

function resetResultStats() {
  resultAnimationToken += 1;
  for (const element of [statDistanceEl, statOpenTimeEl, statExtinguishedEl, statBestEl]) {
    if (!element) continue;
    const row = element.closest("div");
    element.textContent = element === statExtinguishedEl
      ? "0"
      : element === statOpenTimeEl
      ? "00:00"
      : "0m";
    row.classList.remove("revealed", "stat-pop");
  }
}

function animateResultStats(stats) {
  const token = resultAnimationToken;
  stats.reduce((delay, stat, index) => {
    window.setTimeout(() => {
      if (token !== resultAnimationToken) return;
      const row = stat.element.closest("div");
      row.classList.add("revealed");
      playResultTickSound(index);
      animateCounter(stat.element, stat.value, stat.suffix, 820, () => {
        if (token !== resultAnimationToken) return;
        row.classList.remove("stat-pop");
        void row.offsetWidth;
        row.classList.add("stat-pop");
        playResultCompleteSound(index);
      }, stat.formatter);
    }, delay);
    return delay + 760;
  }, 180);
}

function animateCounter(element, targetValue, suffix, duration, done, formatter) {
  const start = performance.now();
  const target = Math.max(0, Math.floor(targetValue));
  const format = formatter || ((value) => `${value}${suffix}`);

  function step(now) {
    const t = THREE.MathUtils.clamp((now - start) / duration, 0, 1);
    const eased = 1 - (1 - t) ** 3;
    const value = Math.floor(target * eased);
    element.textContent = format(value);
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = format(target);
      done();
    }
  }

  requestAnimationFrame(step);
}

function buildTutorialDots() {
  if (!tutorialDots) return;
  tutorialDots.innerHTML = "";
  tutorialCards.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = index === tutorialIndex ? "active" : "";
    tutorialDots.appendChild(dot);
  });
}

function setTutorialCard(index) {
  tutorialIndex = THREE.MathUtils.clamp(index, 0, Math.max(0, tutorialCards.length - 1));
  tutorialCards.forEach((card, cardIndex) => {
    card.classList.toggle("active", cardIndex === tutorialIndex);
  });
  if (tutorialDots) {
    Array.from(tutorialDots.children).forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === tutorialIndex);
    });
  }
  if (tutorialNextButton) {
    tutorialNextButton.textContent = tutorialIndex === tutorialCards.length - 1 ? "Start Run" : "Next";
  }
}

function showTutorial() {
  if (!tutorial || tutorialCards.length === 0) {
    startRun();
    return;
  }
  startAudio({ music: false, audibleUnlock: true }).then((ready) => {
    if (ready) playButtonSound();
  });
  menu.classList.add("hidden");
  gameOver.classList.add("hidden");
  tutorial.classList.remove("hidden");
  buildTutorialDots();
  setTutorialCard(0);
}

function advanceTutorial() {
  startAudio({ music: false, audibleUnlock: true }).then((ready) => {
    if (ready) playButtonSound();
  });
  if (tutorialIndex >= tutorialCards.length - 1) {
    tutorialSeen = true;
    startRun();
    return;
  }
  setTutorialCard(tutorialIndex + 1);
}

function skipTutorial() {
  tutorialSeen = true;
  startRun();
}

function handlePlayRequest() {
  if (state === "over") {
    startRun();
    return;
  }
  if (state !== "menu") return;
  startRun();
}

function startHandGrabScene(hazard) {
  if (state !== "running" || !hazard) return;

  positionHandBase(hazard);
  const playerLocal = getPlayerTargetLocal(hazard);
  const playerRootLocal = getPlayerRootLocal(hazard);

  state = "grabbed";
  stopMusic();
  playCaughtSound();
  keys.clear();
  pointerDown = false;
  player.tarContact = 0;
  hazard.grabbing = true;
  hazard.reachAmount = 1;
  hazard.aimAmount = 1;
  hazard.grabLift = 0;
  hazard.squeezeAmount = 0;

  const maxX = hazard.proximityAngle * TUBE_RADIUS * 0.96;
  const maxY = TUBE_RADIUS - 0.3;
  const maxZ = hazard.proximityZ * 0.94;
  hazard.aimX = THREE.MathUtils.clamp(playerLocal.x, -maxX, maxX);
  hazard.aimY = THREE.MathUtils.clamp(playerLocal.y, 0.45, maxY);
  hazard.aimZ = THREE.MathUtils.clamp(playerLocal.z, -maxZ, maxZ);
  hazard.reachX = hazard.aimX;
  hazard.reachY = hazard.aimY;
  hazard.reachZ = hazard.aimZ;

  updateHandRig(hazard);

  grabScene = {
    hazard,
    time: 0,
    holdOffsetLocal: playerRootLocal.sub(getHandPalmLocal(hazard)),
  };

  poseHandFingers(hazard, 0.9);
  positionGrabbedPlayer(0, 0);
}

function updateGrabScene(dt) {
  if (!grabScene || !grabScene.hazard) return;

  grabScene.time += dt;
  const hazard = grabScene.hazard;
  const t = THREE.MathUtils.clamp(grabScene.time / HAND_GRAB_SCENE_DURATION, 0, 1);
  const lift = smoothStep(0.12, 0.58, t);
  const squeeze = smoothStep(0.52, 0.94, t);

  hazard.reachAmount = 1;
  hazard.aimAmount = 1;
  hazard.grabLift = lift * (1.65 + hazard.handScale * 0.22);
  hazard.squeezeAmount = squeeze;
  positionHandBase(hazard);
  updateHandRig(hazard);
  poseHandFingers(hazard, 0.9 + squeeze * 0.48);
  positionGrabbedPlayer(lift, squeeze);
  updateHud();

  if (grabScene.time >= HAND_GRAB_SCENE_DURATION) {
    crushPlayer();
    finishRun("hand");
  }
}

function positionGrabbedPlayer(lift, squeeze) {
  if (!grabScene || !grabScene.hazard) return;

  const hazard = grabScene.hazard;
  const holdLocal = getHandPalmLocal(hazard);
  const restOffset = new THREE.Vector3(0, -THREE.MathUtils.lerp(0.78, 0.58, lift), 0);
  const holdOffset = grabScene.holdOffsetLocal.clone().lerp(restOffset, smoothStep(0, 0.32, lift));
  holdLocal.add(holdOffset);
  const holdWorld = hazard.group.localToWorld(holdLocal.clone());
  playerRig.position.copy(holdWorld);
  playerRig.quaternion.copy(hazard.group.quaternion);
  playerRig.rotateX(-0.18 * lift);
  playerRig.rotateZ(Math.sin(grabScene.time * 8) * 0.08 * (1 - squeeze));
  const moistureScale = getMoistureScale();
  playerRig.scale.set(
    moistureScale * (1 + squeeze * 0.34),
    moistureScale * (1 - squeeze * 0.74),
    moistureScale * (1 + squeeze * 0.2),
  );
  poseGrabbedPlayer(squeeze);
  tintPlayerCrushed(squeeze);
  player.crushed = squeeze > 0.62;
}

function poseGrabbedPlayer(squeeze) {
  const body = playerRig.getObjectByName("monsterBody");
  const rim = playerRig.getObjectByName("monsterRim");
  const belly = playerRig.getObjectByName("monsterBelly");
  if (body) body.scale.set(0.92 + squeeze * 0.28, 1 - squeeze * 0.52, 0.78 + squeeze * 0.16);
  if (rim) rim.scale.set(0.98 + squeeze * 0.32, 1.03 - squeeze * 0.54, 0.84 + squeeze * 0.18);
  if (belly) belly.scale.set(0.75 + squeeze * 0.22, 0.5 - squeeze * 0.28, 0.12 + squeeze * 0.05);

  for (const name of ["leftArm", "rightArm", "leftLeg", "rightLeg"]) {
    const part = playerRig.getObjectByName(name);
    if (!part) continue;
    const side = part.position.x < 0 ? -1 : 1;
    part.rotation.z = side * (0.35 + squeeze * 0.82);
    part.rotation.x = squeeze * 0.55;
  }

  if (waterSpray) waterSpray.visible = squeeze < 0.22;
}

function tintPlayerCrushed(amount) {
  const crush = THREE.MathUtils.clamp(amount, 0, 1);
  shared.skin.color.set(0xf2d1aa).lerp(new THREE.Color(0x030201), crush);
  shared.cloth.color.set(0xf4e6d1).lerp(new THREE.Color(0x030201), crush);
  shared.dark.color.set(0x1c1714).lerp(new THREE.Color(0x000000), crush);
  shared.waterMonsterMaterial.color.set(0x58c7f0).lerp(new THREE.Color(0x030201), crush);
  shared.waterMonsterMaterial.emissive.set(0x0a6f9f).lerp(new THREE.Color(0x000000), crush);
  shared.waterBellyMaterial.color.set(0xd7f8ff).lerp(new THREE.Color(0x030201), crush);
  shared.waterFinMaterial.color.set(0x2ca8dc).lerp(new THREE.Color(0x020201), crush);
}

function smoothStep(edge0, edge1, value) {
  const x = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
}

function resetPlayerVisual() {
  shared.skin.color.set(0xf2d1aa);
  shared.cloth.color.set(0xf4e6d1);
  shared.dark.color.set(0x1c1714);
  shared.waterMonsterMaterial.color.set(0x58c7f0);
  shared.waterMonsterMaterial.emissive.set(0x0a6f9f);
  shared.waterMonsterMaterial.emissiveIntensity = 0.2;
  shared.waterBellyMaterial.color.set(0xd7f8ff);
  shared.waterFinMaterial.color.set(0x2ca8dc);
  shared.waterFinMaterial.opacity = 0.92;
  playerRig.scale.set(1, 1, 1);
  const rim = playerRig.getObjectByName("monsterRim");
  const body = playerRig.getObjectByName("monsterBody");
  const belly = playerRig.getObjectByName("monsterBelly");
  if (rim) {
    rim.position.set(0, 0.58, 0.04);
    rim.scale.set(0.99, 1, 0.82);
  }
  if (body) {
    body.position.set(0, 0.58, 0.04);
    body.scale.set(0.9, 0.98, 0.76);
  }
  if (belly) {
    belly.position.set(-0.18, 0.84, 0.52);
    belly.scale.set(0.75, 0.5, 0.12);
  }
  if (waterSpray) {
    waterSpray.visible = true;
    waterSpray.quaternion.identity();
    waterSpray.userData.targetBlend = 0;
  }
  if (waterBackpack) {
    waterBackpack.visible = false;
    waterBackpack.scale.set(1.05, 1.05, 1.05);
  }
  if (waterMagnet) {
    waterMagnet.visible = false;
    waterMagnet.scale.set(1, 1, 1);
  }
  clearMagnetSiphons();
  const playerHitbox = playerRig.getObjectByName("playerHitbox");
  if (playerHitbox) {
    playerHitbox.visible = SHOW_HITBOXES;
    playerHitbox.material.color.set(0x35d9ff);
    playerHitbox.material.opacity = 0.88;
  }
}

function crushPlayer() {
  player.crushed = true;
  shared.skin.color.set(0x030201);
  shared.cloth.color.set(0x030201);
  shared.dark.color.set(0x000000);
  shared.waterMonsterMaterial.color.set(0x030201);
  shared.waterMonsterMaterial.emissive.set(0x000000);
  shared.waterBellyMaterial.color.set(0x030201);
  shared.waterFinMaterial.color.set(0x020201);
  playerRig.scale.set(1.24, 0.28, 1.16);
  if (waterSpray) waterSpray.visible = false;
  if (waterBackpack) waterBackpack.visible = false;
  if (waterMagnet) waterMagnet.visible = false;
  clearMagnetSiphons();
  player.tarContact = 0;
}

function update(dt) {
  updateSceneVisibility();
  tarSoundCooldown = Math.max(0, tarSoundCooldown - dt);
  handSoundCooldown = Math.max(0, handSoundCooldown - dt);
  asteroidSoundCooldown = Math.max(0, asteroidSoundCooldown - dt);
  waterPoolSoundCooldown = Math.max(0, waterPoolSoundCooldown - dt);
  speedPadTimer = Math.max(0, speedPadTimer - dt);
  speedPadSoundCooldown = Math.max(0, speedPadSoundCooldown - dt);
  waterBopCooldown = Math.max(0, waterBopCooldown - dt);
  sideDashCooldown = Math.max(0, sideDashCooldown - dt);
  sideDashPulse = Math.max(0, sideDashPulse - dt * 4.2);

  const steer = touchSteer;

  if (state === "running") {
    updateActiveSupportBuffTimer(dt);
    player.tarContact = getTarContact();
    const onTar = player.tarContact > 0;
    const boosting = boostActive && moisture > 9;
    boostPulse = THREE.MathUtils.lerp(boostPulse, boosting ? 1 : 0, Math.min(1, dt * 9));
    const steeringPower = onTar ? 0.74 : 2.65;
    const response = onTar ? 2.6 : 10;
    const speedPenalty = onTar ? 0.48 : 1;
    if (onTar && tarSoundCooldown <= 0) {
      playTarBubbleSound();
      tarSoundCooldown = 0.42;
    }

    if (onTar) {
      player.slideVelocity += steer * dt * 1.2;
      player.slideVelocity *= Math.pow(0.92, dt * 60);
      player.targetAngle = wrapAngle(player.targetAngle + (player.slideVelocity + steer * steeringPower) * dt);
    } else {
      player.slideVelocity *= Math.pow(0.18, dt * 60);
      player.targetAngle = wrapAngle(player.targetAngle + steer * dt * steeringPower);
    }

    player.angle = wrapAngle(
      player.angle + angleDelta(player.targetAngle, player.angle) * Math.min(1, dt * response),
    );

    const config = getAdaptationConfig();
    const rampDistance = 2550 * THREE.MathUtils.lerp(1, 1.32, getEarlySupportFactor() * (1 - config.earlyDifficultyMultiplier));
    speed = 1 + Math.min(1.28, distance / (rampDistance / config.movementIntensityMultiplier));
    const travel = dt * BASE_RUN_SPEED * config.movementIntensityMultiplier * speed * speedPenalty * (1 + boostPulse * (BOOST_SPEED_MULTIPLIER - 1)) * getSpeedPadMultiplier();
    distance += travel;
    player.z -= travel;

    while (nextHazardEdgeZ > player.z - SPAWN_AHEAD) {
      spawnHazard();
    }

    pruneObstacles();
    updateTarEffects(dt);
    updateMoisture(dt);
    updatePowerups(dt);
    updateWarningIndicators(dt);
    maybeTrailSmoke(dt);
    if (state === "running") updateHud();
  } else if (state === "grabbed") {
    player.tarContact = 0;
    boostPulse = 0;
    updateGrabScene(dt);
    updateTarEffects(dt);
  } else if (state === "menu") {
    player.tarContact = 0;
    boostPulse = 0;
    player.targetAngle = wrapAngle(player.targetAngle + dt * 0.12);
    player.angle = wrapAngle(
      player.angle + angleDelta(player.targetAngle, player.angle) * Math.min(1, dt * 2.5),
    );
    updateIntroAnimation(dt);
  } else {
    player.tarContact = 0;
    boostPulse = 0;
  }

  updateTunnel();
  if (state !== "grabbed" && !grabScene) {
    updateRunner(dt);
  }
  updateCamera(dt);
  if (state !== "running" && state !== "grabbed") updateTarEffects(dt);
  updateSmoke(dt);
  updateWaterSplashes(dt);
  updateSizeCallouts(dt);
  updateBackpackVisual(dt);
  updateSupportMessage(dt);
}

function updateSceneVisibility() {
  const showingIntro = state === "menu";
  hud.classList.toggle("hidden", state === "menu" || state === "over");
  if (moistureGauge) moistureGauge.classList.toggle("hidden", state === "menu" || state === "over");
  if (touchControls) touchControls.classList.add("hidden");
  if (mobileTouchZones) mobileTouchZones.classList.toggle("hidden", state !== "running");
  if (powerupRoulette) powerupRoulette.classList.toggle("hidden", state !== "running");
  if (supportMessageEl && state !== "running") supportMessageEl.classList.add("hidden");
  introStage.visible = showingIntro;
  tube.visible = !showingIntro;
  rings.visible = !showingIntro;
  playerRig.visible = !showingIntro;
  tunnelGlowSprite.visible = !showingIntro;
  tunnelGlowLight.visible = !showingIntro;
}

function getSpeedPadMultiplier() {
  return speedPadTimer > 0 ? SPEED_PAD_MULTIPLIER : 1;
}

function getDisplayedSpeedMultiplier() {
  return (BASE_RUN_SPEED / 18.5) *
    getAdaptationConfig().movementIntensityMultiplier *
    speed *
    (player.tarContact > 0 ? 0.48 : 1) *
    (1 + boostPulse * (BOOST_SPEED_MULTIPLIER - 1)) *
    getSpeedPadMultiplier();
}

function getDistanceMilestoneStep() {
  return getAdaptationConfig().gentleMode ? 500 : 1000;
}

function updateHud() {
  const currentDistance = Math.floor(distance);
  distanceEl.textContent = `${currentDistance}m`;
  if (sessionTimeEl) sessionTimeEl.textContent = formatDuration(getOpenSeconds());
  speedEl.textContent = `${getDisplayedSpeedMultiplier().toFixed(1)}x`;
  extinguishedEl.textContent = String(extinguishedCount);
  const moistureValue = Math.ceil(moisture);
  moistureEl.textContent = `${moistureValue}%`;
  if (moistureSideEl) moistureSideEl.textContent = `${moistureValue}%`;
  if (moistureFill) {
    const boosted = waterBackpackActive && moisture > MAX_MOISTURE;
    moistureFill.style.height = boosted ? "66.666%" : `${THREE.MathUtils.clamp(moisture, 0, MAX_MOISTURE)}%`;
  }
  if (moistureBuffFill) {
    const boostedAmount = waterBackpackActive ? THREE.MathUtils.clamp(moisture - MAX_MOISTURE, 0, MAX_BACKPACK_MOISTURE - MAX_MOISTURE) : 0;
    moistureBuffFill.style.height = `${(boostedAmount / (MAX_BACKPACK_MOISTURE - MAX_MOISTURE)) * 33.333}%`;
  }
  const moistureBox = moistureEl && moistureEl.closest("div");
  if (moistureBox) moistureBox.classList.toggle("low", moisture < 24);
  if (moistureGauge) moistureGauge.classList.toggle("low", moisture < 24);
  if (moistureGauge) moistureGauge.classList.toggle("boosted", moisture > MAX_MOISTURE);
  if (state === "running" && currentDistance >= nextDistanceMilestone) {
    const milestoneStep = getDistanceMilestoneStep();
    while (currentDistance >= nextDistanceMilestone) {
      nextDistanceMilestone += milestoneStep;
    }
    pulseHudScore(distanceEl);
    playMilestoneSound();
  }
}

function pulseHudScore(element) {
  const box = element && element.closest("div");
  if (!box) return;
  box.classList.remove("score-pop");
  void box.offsetWidth;
  box.classList.add("score-pop");
}

function updateTunnel() {
  tube.position.z = player.z - TUBE_LENGTH * 0.42;
  tube.material.color.copy(RUN_WALL_COLOR);
  tube.material.emissive.copy(RUN_WALL_COLOR).multiplyScalar(0.025);
  headLamp.color.copy(RUN_LIGHT_COLOR);
  if (tube.material.map) {
    tube.material.map.offset.y = (distance * 0.014) % 1;
  }

  for (const ring of rings.children) {
    if (ring.userData.offset === undefined) {
      ring.position.z = player.z - TUBE_LENGTH * 0.35;
      continue;
    }

    const loopLength = 34 * 7.2;
    let offset = ring.userData.offset + (distance % loopLength);
    while (offset > 16) offset -= loopLength;
    ring.position.z = player.z - 18 + offset;
    const depth = Math.abs(offset);
    ring.material.opacity = THREE.MathUtils.clamp(0.26 - depth / 180, 0.04, 0.24);
    ring.material.color.copy(RUN_WALL_COLOR);
  }

  emberLight.position.set(0, 0, player.z - 74);
  tunnelGlowLight.position.set(0, 0, player.z - 96);
  tunnelGlowSprite.position.set(0, 0, player.z - 118);
  const glowPulse = 0.42 + Math.sin(performance.now() * 0.0012) * 0.08;
  tunnelGlowSprite.material.opacity = glowPulse;
}

function updateRunner(dt) {
  const frame = getSurfaceFrame(player.angle, player.z, 0.08);
  positionRunnerOnTube(playerRig, player.angle, player.z, 0.08);

  if (player.crushed) {
    poseCrushedRunner();
    updateWaterSpray(dt);
    return;
  }

  const moistureScale = getMoistureScale();
  playerRig.scale.setScalar(moistureScale);

  const time = performance.now() * 0.001;
  const swim = state === "running" ? distance * 0.72 : time * 1.4;
  const pulse = Math.sin(swim * 2.1);
  const bob = 0.035 + Math.abs(pulse) * 0.045;
  playerRig.position.add(frame.up.clone().multiplyScalar(bob));
  const forwardLean = state === "running" ? -0.18 - Math.min(0.12, (speed - 1) * 0.08) : -0.06;
  playerRig.rotateX(forwardLean + Math.sin(swim * 0.42) * 0.02);

  const body = playerRig.getObjectByName("monsterBody");
  const rim = playerRig.getObjectByName("monsterRim");
  const belly = playerRig.getObjectByName("monsterBelly");
  const shade = playerRig.getObjectByName("monsterSideShade");
  const nozzle = playerRig.getObjectByName("monsterNozzle");
  const bodySquash = 1 + pulse * 0.03;
  if (body) {
    body.rotation.set(pulse * 0.025, Math.sin(swim * 0.72) * 0.045, -pulse * 0.025);
    body.scale.set(0.9 + pulse * 0.016, 0.98 / bodySquash, 0.76 + pulse * 0.012);
  }
  if (rim) {
    rim.rotation.copy(body ? body.rotation : rim.rotation);
    rim.scale.set(0.99 + pulse * 0.016, 1 / bodySquash, 0.82 + pulse * 0.012);
  }
  if (belly) {
    belly.position.y = 0.84 + Math.sin(swim * 1.7) * 0.016;
    belly.scale.set(0.75 + pulse * 0.02, 0.5 - pulse * 0.012, 0.12);
  }
  if (shade) {
    shade.rotation.copy(body ? body.rotation : shade.rotation);
    shade.scale.set(0.46 + pulse * 0.01, 0.58 - pulse * 0.01, 0.34);
  }
  if (nozzle) {
    nozzle.rotation.x = Math.PI * 0.5 + Math.sin(swim * 1.9) * 0.035;
    nozzle.scale.set(1 + pulse * 0.04, 1 + pulse * 0.04, 1);
  }

  for (const side of [-1, 1]) {
    const armSwing = Math.sin(swim * 2.1 + side * Math.PI);
    const legSwing = Math.sin(swim * 2.1 + (side < 0 ? 0 : Math.PI));
    const arm = playerRig.getObjectByName(side < 0 ? "leftArm" : "rightArm");
    const leg = playerRig.getObjectByName(side < 0 ? "leftLeg" : "rightLeg");

    if (arm) {
      arm.position.set(side * 0.52, 0.54 + armSwing * 0.035, 0.08 + armSwing * 0.04);
      arm.rotation.z = side * (0.95 + armSwing * 0.18);
      arm.rotation.x = -0.2 + armSwing * 0.34;
    }
    if (leg) {
      leg.position.set(side * 0.25, -0.03 + Math.max(0, -legSwing) * 0.055, 0.02 + legSwing * 0.06);
      leg.rotation.z = side * (0.28 + legSwing * 0.08);
      leg.rotation.x = 0.08 + legSwing * 0.34;
    }
  }

  updateDashTrail(swim);
  updateWaterSpray(dt);
}

function getMoistureScale() {
  const moistureRatio = THREE.MathUtils.clamp((getMoistureBand() * SIZE_BAND_STEP) / MAX_MOISTURE, 0, 1);
  return 0.5 + moistureRatio * 0.5;
}

function getMoistureCap() {
  return waterBackpackActive ? MAX_BACKPACK_MOISTURE : MAX_MOISTURE;
}

function getMoistureBand() {
  const baseMoisture = THREE.MathUtils.clamp(moisture, 0, MAX_MOISTURE);
  if (baseMoisture <= 0) return 0;
  return Math.ceil(baseMoisture / SIZE_BAND_STEP);
}

function checkMoistureBandFeedback() {
  const currentBand = getMoistureBand();
  if (currentBand === lastMoistureBand) return;

  const direction = currentBand > lastMoistureBand ? 1 : -1;
  const steps = Math.abs(currentBand - lastMoistureBand);
  for (let i = 0; i < steps; i += 1) {
    showSizeCallout(direction > 0 ? "+10% size" : "-10% size", direction, i);
  }
  if (direction > 0) {
    playSizeGrowSound();
  } else {
    playSizeShrinkSound();
  }
  lastMoistureBand = currentBand;
}

function getPlayerWidth() {
  return PLAYER_WIDTH * getMoistureScale();
}

function getPlayerDepth() {
  return PLAYER_DEPTH * getMoistureScale();
}

function updateDashTrail(swim) {
  const dashTrail = playerRig.getObjectByName("dashTrail");
  if (!dashTrail) return;

  const intensity = state === "running" ? THREE.MathUtils.clamp(0.45 + speed * 0.22 + sideDashPulse * 0.55, 0.55, 1.45) : 0.12;
  dashTrail.visible = state === "running" && !player.crushed;
  for (const streak of dashTrail.children) {
    const t = (streak.userData.offset + swim * 0.11) % 1;
    const band = streak.userData.band || "body";
    const sideSign = streak.userData.sideSign || 1;
    const sideDrift = streak.userData.side * (0.12 + t * 0.1);
    const baseX = band === "arm"
      ? sideSign * (0.82 + t * 0.2)
      : band === "upper"
      ? sideSign * (0.58 + t * 0.16)
      : streak.userData.side * (0.42 + t * 0.16);
    const baseY = band === "arm"
      ? 0.52 + Math.sin(swim * 2 + sideSign) * 0.08
      : band === "upper"
      ? 0.82 + Math.sin(swim * 1.7 + sideSign) * 0.05
      : streak.userData.height;
    const x = baseX + sideDrift;
    const y = baseY + Math.sin(swim * 2 + streak.userData.side) * 0.035;
    const z = -0.32 - t * (3.35 + speed * 0.7);
    streak.position.set(x, y, z);
    streak.rotation.z = sideSign * (band === "body" ? 0.16 : 0.34);
    streak.scale.set(1, 1, streak.userData.length * intensity * (0.55 + t));
    streak.material.opacity = (1 - t) * (band === "body" ? 0.36 : 0.48) * intensity;
  }
}

function showSizeCallout(text, direction, index = 0) {
  if (state !== "running" && state !== "grabbed") return;
  const frame = getSurfaceFrame(player.angle, player.z, 0.08);
  const color = direction > 0 ? "#dffcff" : "#ffd1a5";
  const stroke = direction > 0 ? "rgba(7, 73, 105, 0.95)" : "rgba(92, 28, 5, 0.95)";
  const sprite = createTextSprite(text, {
    fontSize: 44,
    color,
    stroke,
    width: 520,
    height: 150,
    baseScale: new THREE.Vector3(2.25, 0.65, 1),
  });
  sprite.name = "size-change-callout";
  sprite.position
    .copy(frame.root)
    .add(frame.up.clone().multiplyScalar(1.42 + index * 0.25))
    .add(frame.right.clone().multiplyScalar(direction > 0 ? 1.2 : -1.2))
    .add(frame.forward.clone().multiplyScalar(0.45));
  calloutGroup.add(sprite);
  sizeCallouts.push({
    sprite,
    life: 1.05 + index * 0.08,
    maxLife: 1.05 + index * 0.08,
    drift: frame.up.clone().multiplyScalar(0.7).add(frame.right.clone().multiplyScalar(direction * 0.24)),
  });
}

function updateSizeCallouts(dt) {
  sizeCallouts = sizeCallouts.filter((callout) => {
    callout.life -= dt;
    const t = THREE.MathUtils.clamp(1 - callout.life / callout.maxLife, 0, 1);
    callout.sprite.position.addScaledVector(callout.drift, dt);
    callout.sprite.scale.copy(callout.sprite.userData.baseScale).multiplyScalar(1 + Math.sin(t * Math.PI) * 0.24);
    callout.sprite.material.opacity = Math.max(0, 1 - t);
    const keep = callout.life > 0;
    if (!keep) {
      calloutGroup.remove(callout.sprite);
      disposeSprite(callout.sprite);
    }
    return keep;
  });
}

function clearSizeCallouts() {
  for (const callout of sizeCallouts) {
    calloutGroup.remove(callout.sprite);
    disposeSprite(callout.sprite);
  }
  sizeCallouts = [];
}

function poseCrushedRunner() {
  const body = playerRig.getObjectByName("monsterBody");
  const rim = playerRig.getObjectByName("monsterRim");
  const belly = playerRig.getObjectByName("monsterBelly");
  if (body) body.scale.set(1.24, 0.38, 1.02);
  if (rim) rim.scale.set(1.3, 0.42, 1.08);
  if (belly) belly.scale.set(0.88, 0.18, 0.16);
  if (waterSpray) waterSpray.visible = false;
}

function poseHumanArm(sideName, side, swing, collapse) {
  const shoulder = playerRig.getObjectByName(`${sideName}Shoulder`);
  const upper = playerRig.getObjectByName(`${sideName}UpperArm`);
  const forearm = playerRig.getObjectByName(`${sideName}Forearm`);
  const hand = playerRig.getObjectByName(`${sideName}Hand`);
  const x = side * 0.43;
  const sag = collapse * 0.28;

  if (shoulder) {
    shoulder.position.set(x, 1.18 - sag * 0.3, -0.02);
    shoulder.scale.set(1, 0.82, 0.82);
  }

  poseSegment(upper, x, 0.92 - sag, -0.04 + swing * 0.05, side * 0.22, 0.38 - collapse * 0.08, swing * 0.72 - collapse * 0.55);
  poseSegment(forearm, side * 0.37, 0.62 - sag, 0.02 + swing * 0.12, side * 0.13, 0.34 - collapse * 0.06, swing * 0.54 + 0.35 - collapse * 0.8);
  if (hand) {
    hand.position.set(side * 0.34, 0.41 - sag, 0.08 + swing * 0.16);
    hand.scale.set(1, 0.9, 1.08);
  }
}

function poseHumanLeg(sideName, side, swing, collapse) {
  const thigh = playerRig.getObjectByName(`${sideName}UpperLeg`);
  const shin = playerRig.getObjectByName(`${sideName}Shin`);
  const foot = playerRig.getObjectByName(`${sideName}Foot`);
  const x = side * 0.18;
  const kneeBend = Math.max(0, -swing) * 0.55 + collapse * 0.7;
  const step = swing * 0.18;

  poseSegment(thigh, x, 0.31 - collapse * 0.1, 0.03 + step, side * 0.1, 0.42 - collapse * 0.08, swing * 0.82 - collapse * 0.5);
  poseSegment(shin, side * 0.16, 0.1 - collapse * 0.06, 0.09 - step * 0.55, side * 0.06, 0.38 - collapse * 0.08, -swing * 0.48 + kneeBend);
  if (foot) {
    foot.position.set(side * 0.16, 0.045, 0.2 + step * 0.9);
    foot.rotation.set(-swing * 0.26 + kneeBend * 0.18, 0, side * 0.03);
    foot.scale.set(1, 1, 1);
  }
}

function poseSegment(mesh, x, y, z, zTilt, length, swing) {
  if (!mesh) return;
  mesh.position.set(x, y, z);
  mesh.scale.set(1, length, 1);
  mesh.rotation.set(swing, 0, zTilt);
}

function updateCamera(dt) {
  if (state === "over" && endCameraFreeze) {
    camera.position.copy(endCameraFreeze.position);
    camera.quaternion.copy(endCameraFreeze.quaternion);
    camera.up.copy(endCameraFreeze.up);
    return;
  }

  if (state === "menu") {
    updateIntroCamera(dt);
    return;
  }

  if ((state === "grabbed" || (state === "over" && grabScene)) && grabScene) {
    updateGrabCamera(dt);
    return;
  }

  const frame = getSurfaceFrame(player.angle, player.z, 0.08);
  const speedRush = state === "running"
    ? THREE.MathUtils.clamp(0.58 + (speed - 1) / 1.55 + boostPulse * 0.3 + (speedPadTimer > 0 ? 0.32 : 0), 0, 1)
    : 0;
  const shakeAmount = state === "running" ? 0.022 + speedRush * 0.072 : 0;
  const verticalShake = Math.sin(distance * 2.7) * shakeAmount;
  const sideShake = Math.sin(distance * 3.9 + 1.4) * shakeAmount * 0.48;
  const turnLag = THREE.MathUtils.clamp(angleDelta(player.targetAngle, player.angle), -0.52, 0.52);
  const chaseDistance = THREE.MathUtils.lerp(5.35, 4.15, speedRush);
  const chaseHeight = THREE.MathUtils.lerp(2.34, 1.96, speedRush);
  const lookAhead = THREE.MathUtils.lerp(54, 76, speedRush);
  const cameraPos = frame.root
    .clone()
    .add(frame.up.clone().multiplyScalar(chaseHeight + verticalShake))
    .add(frame.right.clone().multiplyScalar(sideShake - turnLag * 0.85))
    .add(frame.forward.clone().multiplyScalar(-chaseDistance));
  const targetPos = frame.root
    .clone()
    .add(frame.up.clone().multiplyScalar(0.48 + speedRush * 0.08))
    .add(frame.right.clone().multiplyScalar(turnLag * 2.2))
    .add(frame.forward.clone().multiplyScalar(lookAhead));

  const targetFov = 101 + speedRush * 10.5;
  camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, Math.min(1, dt * 5));
  camera.updateProjectionMatrix();
  camera.position.lerp(cameraPos, Math.min(1, dt * 14));
  camera.up.copy(frame.up);
  camera.lookAt(targetPos);
}

function updateIntroCamera(dt) {
  const data = introStage.userData;
  if (!data) return;
  const cameraPos = data.cameraPos || new THREE.Vector3(0, 1.4, 5);
  const targetPos = data.cameraTarget || new THREE.Vector3(0, 0.8, 0);
  const targetFov = data.cameraFov || 72;

  camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, Math.min(1, dt * 5.4));
  camera.updateProjectionMatrix();
  camera.position.lerp(cameraPos, Math.min(1, dt * 8.5));
  camera.up.lerp(data.cameraUp || LOCAL_UP, Math.min(1, dt * 6));
  camera.up.normalize();
  camera.lookAt(targetPos);
}

function updateGrabCamera(dt) {
  const hazard = grabScene.hazard;
  const frame = getSurfaceFrame(player.angle, player.z, 0.08);
  const palmWorld = hazard.group.localToWorld(getHandPalmLocal(hazard).clone());
  const targetPos = playerRig.position.clone().lerp(palmWorld, 0.58);
  const cameraPos = targetPos
    .clone()
    .add(frame.up.clone().multiplyScalar(4.4))
    .add(frame.forward.clone().multiplyScalar(-8.2))
    .add(frame.right.clone().multiplyScalar(2.15));

  camera.position.lerp(cameraPos, Math.min(1, dt * 8));
  camera.up.copy(frame.up);
  camera.lookAt(targetPos);
}

function pruneObstacles() {
  obstacles = obstacles.filter((obstacle) => {
    if (obstacle.collected) {
      scene.remove(obstacle.group);
      return false;
    }
    const lingerDistance = obstacle.kind === "tar" ? 62 : obstacle.kind === "fire" ? 62 : obstacle.kind === "ash" ? 38 : obstacle.kind === "wall" ? 42 : obstacle.kind === "waterPool" ? 44 : obstacle.kind === "speedPad" ? 38 : obstacle.kind === "water" ? 34 : obstacle.kind === "powerup" ? 34 : 34;
    const keep = obstacle.z + obstacle.zSpan * 0.5 < player.z + lingerDistance;
    if (!keep) {
      scene.remove(obstacle.group);
    }
    return keep;
  });
}

function getTarContact() {
  if (distance < START_CLEAR_DISTANCE) return 0;
  for (const obstacle of obstacles) {
    if (obstacle.kind !== "tar") continue;
    if (isPlayerOnSurfacePatch(obstacle, getPlayerDepth() * 0.65, getPlayerWidth())) return 1;
  }
  return 0;
}

function isPlayerOnSurfacePatch(obstacle, depthPadding, anglePadding) {
  if (distance < START_CLEAR_DISTANCE || !obstacle) return false;
  const dz = Math.abs(obstacle.z - player.z);
  if (dz > obstacle.zSpan * 0.5 + depthPadding) return false;

  const centerAngle = getHazardAngleAt(obstacle, player.z);
  const halfWidth = obstacle.angleSpan * 0.5 * getHazardWidthScale(obstacle, player.z);
  const angularDistance = Math.abs(angleDelta(player.angle, centerAngle));
  return angularDistance < anglePadding + halfWidth;
}

function updateMoisture(dt) {
  if (state !== "running") return;

  const config = getAdaptationConfig();
  const supportDrainMultiplier = config.gentleMode ? 0.78 : config.calmMode ? 0.9 : 1;
  const drain = dt * supportDrainMultiplier * (1.05 + speed * 0.34 + player.tarContact * 1.9 + boostPulse * BOOST_DRAIN_RATE);
  moisture = THREE.MathUtils.clamp(moisture - drain, 0, getMoistureCap());
  if (waterBackpackActive && moisture <= MAX_MOISTURE) {
    deactivateWaterBackpack();
  }
  checkMoistureBandFeedback();

  if (moisture <= 0) {
    crushPlayer();
    endRun("moisture");
    return;
  }

  if (moisture < 24 && distance - lastMoistureWarningAt > 130) {
    lastMoistureWarningAt = distance;
    pulseHudScore(moistureEl);
    playMoistureWarningSound();
  }
}

function updateTarEffects(dt) {
  const time = performance.now() * 0.001;
  const hazardsVisible = distance >= START_CLEAR_DISTANCE;
  for (const obstacle of obstacles) {
    obstacle.group.visible = hazardsVisible;
    if (obstacle.kind === "tar") {
      for (const bubble of obstacle.bubbles) {
        updateTarBubble(obstacle, bubble, time);
      }
    } else if (obstacle.kind === "fire") {
      updateFirePile(obstacle, dt, time);
    } else if (obstacle.kind === "hand") {
      updateHandHazard(obstacle, dt);
    } else if (obstacle.kind === "water") {
      updateWaterPickup(obstacle, dt, time);
    } else if (obstacle.kind === "waterPool") {
      updateWaterPool(obstacle, dt, time);
    } else if (obstacle.kind === "speedPad") {
      updateSpeedPad(obstacle, dt, time);
    } else if (obstacle.kind === "powerup") {
      updatePowerupBox(obstacle, dt, time);
    } else if (obstacle.kind === "ash") {
      updateAshAsteroid(obstacle, dt, time);
    } else if (obstacle.kind === "wall") {
      updateCollapsedWallHazard(obstacle, dt, time);
    }
  }

  const playerHitbox = playerRig.getObjectByName("playerHitbox");
  if (playerHitbox) {
    playerHitbox.visible = SHOW_HITBOXES;
    playerHitbox.material.color.set(player.tarContact > 0 ? 0xffc533 : 0x35d9ff);
    playerHitbox.material.opacity = player.tarContact > 0 ? 1 : 0.88;
  }
}

function maybeTrailSmoke(dt) {
  const clarityMultiplier = getAdaptationConfig().visualClarityBoost || getAdaptationConfig().calmMode ? 0.45 : 1;
  if (Math.random() > dt * 4 * clarityMultiplier) return;
  const radial = radialFromAngle(player.angle + THREE.MathUtils.randFloatSpread(0.32));
  const position = radial.multiplyScalar(THREE.MathUtils.randFloat(2, TUBE_RADIUS - 1.4));
  position.z = player.z - THREE.MathUtils.randFloat(18, 58);
  addSmoke(position, THREE.MathUtils.randFloat(0.12, 0.32), 0.1);
}

function burstSmoke() {
  for (let i = 0; i < 34; i += 1) {
    const burstAngle = player.angle + THREE.MathUtils.randFloatSpread(0.8);
    const pos = radialFromAngle(burstAngle).multiplyScalar(THREE.MathUtils.randFloat(TUBE_RADIUS - 1.8, TUBE_RADIUS - 0.4));
    pos.z = player.z + THREE.MathUtils.randFloatSpread(1.8);
    addSmoke(pos, THREE.MathUtils.randFloat(0.2, 0.62), 0.42);
  }
}

function addSmoke(position, size, alpha, sourceMaterial = shared.smokeMaterial) {
  const material = sourceMaterial.clone();
  material.opacity = alpha;
  const mesh = new THREE.Mesh(shared.smokeGeometry, material);
  mesh.position.copy(position);
  mesh.scale.setScalar(size);
  smokeGroup.add(mesh);
  smoke.push({
    mesh,
    life: 1,
    maxOpacity: alpha,
    drift: new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(0.22),
      THREE.MathUtils.randFloatSpread(0.22),
      THREE.MathUtils.randFloat(0.8, 2.2),
    ),
  });
}

function addWaterSplash(hazard, count) {
  if (!hazard || !hazard.group) return;

  for (let i = 0; i < count; i += 1) {
    const material = (Math.random() > 0.35 ? shared.splashMaterial : shared.waterFoamMaterial).clone();
    material.opacity = THREE.MathUtils.randFloat(0.62, 0.92);
    const mesh = new THREE.Mesh(shared.waterDropletGeometry, material);
    const localPosition = new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(hazard.pileHalfWidth * 1.55),
      THREE.MathUtils.randFloat(0.62, 1.55),
      THREE.MathUtils.randFloatSpread(hazard.zSpan * 0.55),
    );
    const localVelocity = new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(2.8),
      THREE.MathUtils.randFloat(2.2, 6.8),
      THREE.MathUtils.randFloatSpread(3.4),
    );
    const origin = hazard.group.localToWorld(localPosition.clone());
    const target = hazard.group.localToWorld(localPosition.clone().add(localVelocity));
    const velocity = target.sub(origin).multiplyScalar(0.72);
    const size = THREE.MathUtils.randFloat(0.045, 0.13);

    mesh.position.copy(origin);
    mesh.scale.setScalar(size);
    splashGroup.add(mesh);
    splashes.push({
      mesh,
      velocity,
      life: THREE.MathUtils.randFloat(0.35, 0.72),
      maxLife: 0.72,
      spin: THREE.MathUtils.randFloatSpread(5),
    });
  }
}

function updateWaterSplashes(dt) {
  splashes = splashes.filter((splash) => {
    splash.life -= dt;
    splash.velocity.multiplyScalar(Math.pow(0.72, dt));
    splash.mesh.position.addScaledVector(splash.velocity, dt);
    splash.mesh.rotation.x += splash.spin * dt;
    splash.mesh.rotation.z -= splash.spin * 0.7 * dt;
    splash.mesh.scale.multiplyScalar(1 + dt * 0.8);
    splash.mesh.material.opacity = Math.max(0, (splash.life / splash.maxLife) * 0.86);
    const keep = splash.life > 0 && splash.mesh.position.z < player.z + 22;
    if (!keep) {
      splashGroup.remove(splash.mesh);
      splash.mesh.material.dispose();
    }
    return keep;
  });
}

function addPositionSplash(position, count, spread = 3.2, minSize = 0.045, lifeBonus = 0) {
  for (let i = 0; i < count; i += 1) {
    const material = (Math.random() > 0.35 ? shared.splashMaterial : shared.waterFoamMaterial).clone();
    material.opacity = THREE.MathUtils.randFloat(0.58, 0.92);
    const mesh = new THREE.Mesh(shared.waterDropletGeometry, material);
    mesh.position.copy(position);
    mesh.scale.setScalar(THREE.MathUtils.randFloat(minSize, minSize * 2.5));
    splashGroup.add(mesh);
    splashes.push({
      mesh,
      velocity: new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(spread),
        THREE.MathUtils.randFloatSpread(spread * 0.9),
        THREE.MathUtils.randFloatSpread(spread),
      ),
      life: THREE.MathUtils.randFloat(0.3, 0.6) + lifeBonus,
      maxLife: 0.6 + lifeBonus,
      spin: THREE.MathUtils.randFloatSpread(6),
    });
  }
}

function addPlayerSplash(count = 28) {
  playerRig.updateMatrixWorld(true);
  const frame = getSurfaceFrame(player.angle, player.z, 0.08);
  const origin = frame.root.clone().add(frame.up.clone().multiplyScalar(0.74));
  addPositionSplash(origin, count, 4.8, 0.055, 0.12);
}

function startPowerupRoll() {
  const roll = Math.random();
  const result = roll < 0.34
    ? "warning"
    : roll < 0.58
    ? "backpack"
    : roll < 0.8
    ? "beam"
    : "magnet";
  powerupRoll = {
    time: 0,
    result,
    iconIndex: -1,
  };
  activePowerup = null;
  clearWarningIndicators();
  updatePowerupUi();
}

function updatePowerups(dt) {
  if (powerupRoll) {
    powerupRoll.time += dt;
    const iconIndex = Math.floor(powerupRoll.time / 0.105) % POWERUP_OPTIONS.length;
    if (iconIndex !== powerupRoll.iconIndex) {
      powerupRoll.iconIndex = iconIndex;
      setRouletteDisplay(POWERUP_OPTIONS[iconIndex].label, POWERUP_OPTIONS[iconIndex].type);
      playRouletteTickSound();
    }
    if (powerupRoll.time >= POWERUP_ROLL_DURATION) {
      const result = powerupRoll.result;
      powerupRoll = null;
      activatePowerup(result);
    }
  }

  if (activePowerup) {
    activePowerup.time = Math.max(0, activePowerup.time - dt);
    if (activePowerup.time <= 0) {
      if (activePowerup.type === "warning") {
        clearWarningIndicators();
      }
      if (activePowerup.type === "magnet") {
        clearMagnetSiphons();
      }
      activePowerup = null;
    }
  }

  updateWaterMagnet(dt);

  updatePowerupUi();
}

function activatePowerup(type) {
  activePowerup = { type, time: POWERUP_DURATION };
  playPowerupLandSound();
  if (powerupRoulette) {
    powerupRoulette.classList.remove("landed");
    void powerupRoulette.offsetWidth;
    powerupRoulette.classList.add("landed");
  }
  if (type === "warning") {
    clearWarningIndicators();
  } else if (type === "backpack") {
    activateWaterBackpack();
  } else if (type === "magnet") {
    clearMagnetSiphons();
  }
  updatePowerupUi();
}

function updatePowerupUi() {
  if (!powerupRoulette || !rouletteIconEl || !powerupStatusEl) return;
  powerupRoulette.classList.toggle("rolling", Boolean(powerupRoll));
  powerupRoulette.classList.toggle("active", Boolean(activePowerup) || waterBackpackActive);
  if (powerupRoll) {
    powerupStatusEl.textContent = "Rolling";
    return;
  }
  if (activePowerup) {
    const labels = {
      warning: "WARN",
      backpack: "PACK",
      beam: "2X",
      magnet: "MAG",
    };
    const names = {
      warning: "Warning",
      backpack: "Backpack",
      beam: "Double Range",
      magnet: "Magnet",
    };
    setRouletteDisplay(labels[activePowerup.type] || "BUFF", activePowerup.type);
    powerupStatusEl.textContent = `${names[activePowerup.type] || "Buff"} ${Math.ceil(activePowerup.time)}s`;
    return;
  }
  if (waterBackpackActive) {
    setRouletteDisplay("PACK", "backpack");
    powerupStatusEl.textContent = `${Math.ceil(moisture)}%`;
    return;
  }
  setRouletteDisplay("?", "ready");
  powerupStatusEl.textContent = "Ready";
}

function setRouletteDisplay(label, type = "ready") {
  if (rouletteIconEl) rouletteIconEl.textContent = label;
  if (powerupRoulette) powerupRoulette.dataset.powerup = type;
}

function activateWaterBackpack() {
  waterBackpackActive = true;
  moisture = MAX_BACKPACK_MOISTURE;
  if (waterBackpack) waterBackpack.visible = true;
  addPlayerSplash(34);
  playBackpackSound();
  checkMoistureBandFeedback();
  pulseHudScore(moistureEl);
}

function deactivateWaterBackpack(withSplash = true) {
  if (!waterBackpackActive) return;
  waterBackpackActive = false;
  if (waterBackpack) waterBackpack.visible = false;
  if (withSplash) {
    addPlayerSplash(22);
    playBackpackVanishSound();
  }
  updatePowerupUi();
}

function updateBackpackVisual(dt) {
  if (!waterBackpack) return;
  waterBackpack.visible = waterBackpackActive && !player.crushed;
  if (!waterBackpack.visible) return;
  const time = performance.now() * 0.001;
  const pulse = 1.05 + Math.sin(time * 6.8) * 0.06;
  waterBackpack.scale.setScalar(pulse);
  const glow = waterBackpack.getObjectByName("water-backpack-glow");
  if (glow) {
    glow.material.opacity = 0.18 + Math.sin(time * 5.4) * 0.08;
    glow.rotation.y += dt * 1.6;
  }
  const waterSurface = waterBackpack.getObjectByName("water-backpack-open-water");
  if (waterSurface) {
    waterSurface.material.opacity = 0.62 + Math.sin(time * 7.2) * 0.16;
    waterSurface.scale.set(1.2 + Math.sin(time * 5.4) * 0.08, 0.82 + Math.cos(time * 4.8) * 0.06, 1);
  }
  const overflow = waterBackpack.getObjectByName("water-backpack-overflow");
  if (overflow) {
    for (const drop of overflow.children) {
      const cycle = (time * 0.9 + drop.userData.phase / TAU) % 1;
      const angle = drop.userData.phase + time * 1.4;
      const radius = drop.userData.radius;
      drop.position.set(
        Math.cos(angle) * radius,
        0.5 - cycle * (0.24 + drop.userData.height),
        -0.01 + Math.sin(angle) * radius * 0.7,
      );
      drop.scale.setScalar(0.03 + (1 - cycle) * 0.026);
      drop.material.opacity = 0.22 + (1 - cycle) * 0.72;
    }
  }
}

function updateWaterMagnet(dt) {
  const active = state === "running" && activePowerup?.type === "magnet" && !player.crushed;
  if (waterMagnet) {
    waterMagnet.visible = active;
  }
  if (!active) {
    clearMagnetSiphons();
    return;
  }

  const time = performance.now() * 0.001;
  animateWaterMagnet(time, dt);

  let drewSiphons = 0;
  let refilled = false;
  for (const obstacle of obstacles) {
    if (obstacle.kind === "water" && !obstacle.collected && isWaterDropletInMagnetRing(obstacle)) {
      collectWaterPickup(obstacle);
      refilled = true;
    } else if (obstacle.kind === "waterPool" && isHazardInMagnetRange(obstacle, WATER_MAGNET_RANGE_Z * 0.82, WATER_MAGNET_RANGE_ANGLE * 0.92)) {
      refilled = refillFromWaterPoolByMagnet(obstacle, dt) || refilled;
      if (drewSiphons < 3) {
        drawMagnetSiphon(getWaterPoolSiphonPoint(obstacle), getWaterMagnetWorldPosition(), drewSiphons, time);
        drewSiphons += 1;
      }
    }
  }
  hideUnusedMagnetSiphons(drewSiphons * 3);
  if (refilled) updateHud();
}

function animateWaterMagnet(time, dt) {
  if (!waterMagnet) return;
  const pulse = 1.08 + Math.sin(time * 8.2) * 0.1;
  waterMagnet.position.y = 1.82 + Math.sin(time * 4.8) * 0.08;
  waterMagnet.scale.setScalar(pulse);

  const ring = waterMagnet.getObjectByName("water-magnet-ring");
  const innerRing = waterMagnet.getObjectByName("water-magnet-inner-ring");
  const core = waterMagnet.getObjectByName("water-magnet-core");
  const halo = waterMagnet.getObjectByName("water-magnet-attract-halo");
  if (ring) {
    ring.rotation.z += dt * 4.8;
    ring.material.opacity = 0.38 + Math.sin(time * 9.4) * 0.12;
  }
  if (innerRing) {
    innerRing.rotation.z -= dt * 5.6;
    innerRing.material.opacity = 0.48 + Math.cos(time * 7.6) * 0.18;
  }
  if (core) {
    core.rotation.y += dt * 3.8;
    core.scale.set(0.16 * pulse, 0.22 * (1 / pulse), 0.16 * pulse);
  }
  if (halo) {
    halo.rotation.x += dt * 1.6;
    halo.material.opacity = 0.2 + Math.sin(time * 6.2) * 0.12;
  }
}

function isWaterDropletInMagnetRing(hazard) {
  if (!hazard) return false;
  const dz = Math.abs(hazard.z - player.z);
  return dz < WATER_MAGNET_RING_RANGE_Z + hazard.zSpan * 0.5;
}

function isHazardInMagnetRange(hazard, zRange, angleRange) {
  const dz = Math.abs(hazard.z - player.z);
  if (dz > zRange + hazard.zSpan * 0.5) return false;
  const centerAngle = hazard.kind === "waterPool" || hazard.kind === "tar"
    ? getHazardAngleAt(hazard, THREE.MathUtils.clamp(player.z, hazard.z - hazard.zSpan * 0.5, hazard.z + hazard.zSpan * 0.5))
    : hazard.angle;
  const angularDistance = Math.abs(angleDelta(player.angle, centerAngle));
  return angularDistance < angleRange + hazard.angleSpan * 0.72 + getPlayerWidth();
}

function refillFromWaterPoolByMagnet(hazard, dt) {
  if (!hazard) return false;
  hazard.refillContact = 1;
  const before = moisture;
  moisture = THREE.MathUtils.clamp(
    moisture + WATER_POOL_REFILL_RATE * getAdaptationConfig().waterPickupMultiplier * 0.82 * dt,
    0,
    getMoistureCap(),
  );
  if (moisture <= before) return false;
  if (Math.floor(before / 10) !== Math.floor(moisture / 10)) {
    pulseHudScore(moistureEl);
  }
  checkMoistureBandFeedback();
  if (waterPoolSoundCooldown <= 0) {
    playWaterPoolSound();
    waterPoolSoundCooldown = 0.42;
  }
  return true;
}

function getWaterPoolSiphonPoint(hazard) {
  const sampleZ = THREE.MathUtils.clamp(player.z, hazard.z - hazard.zSpan * 0.5, hazard.z + hazard.zSpan * 0.5);
  const sampleAngle = getHazardAngleAt(hazard, sampleZ);
  const frame = getSurfaceFrame(sampleAngle, sampleZ, 0.07);
  return frame.root.clone().add(frame.up.clone().multiplyScalar(0.08));
}

function getWaterMagnetWorldPosition() {
  if (!waterMagnet) return getPlayerTargetWorld();
  const frame = getSurfaceFrame(player.angle, player.z, 0.08);
  return frame.root
    .clone()
    .add(frame.up.clone().multiplyScalar(waterMagnet.position.y))
    .add(frame.forward.clone().multiplyScalar(waterMagnet.position.z));
}

function drawMagnetSiphon(start, end, siphonIndex, time) {
  const frame = getSurfaceFrame(player.angle, player.z, 0.08);
  const arcLift = 1.15 + Math.sin(time * 5.4 + siphonIndex) * 0.2;
  const mid = start.clone().lerp(end, 0.52).add(frame.up.clone().multiplyScalar(arcLift));
  const points = [
    start,
    start.clone().lerp(mid, 0.72),
    mid.clone().lerp(end, 0.72),
    end,
  ];
  for (let i = 0; i < 3; i += 1) {
    const segment = ensureMagnetSiphon(siphonIndex * 3 + i);
    const pulse = 0.78 + Math.sin(time * 11.8 + i + siphonIndex * 0.9) * 0.22;
    segment.visible = true;
    segment.material.opacity = 0.28 + pulse * 0.24;
    placeCylinderBetween(segment, points[i], points[i + 1], 0.035 + pulse * 0.018);
  }
}

function ensureMagnetSiphon(index) {
  while (magnetSiphonGroup.children.length <= index) {
    const material = shared.waterSprayMaterial.clone();
    material.opacity = 0.42;
    const segment = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 8), material);
    segment.name = "water-magnet-siphon";
    segment.renderOrder = 2;
    segment.visible = false;
    magnetSiphonGroup.add(segment);
  }
  return magnetSiphonGroup.children[index];
}

function hideUnusedMagnetSiphons(startIndex = 0) {
  for (let i = startIndex; i < magnetSiphonGroup.children.length; i += 1) {
    magnetSiphonGroup.children[i].visible = false;
  }
}

function clearMagnetSiphons() {
  hideUnusedMagnetSiphons(0);
}

function createGhostMaterial(color, opacity = 0.32, additive = true) {
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
  material.userData.baseOpacity = opacity;
  return material;
}

function updateWarningIndicators(dt) {
  const config = getAdaptationConfig();
  const warningSupportActive = activePowerup?.type === "warning" || config.warningTimeMultiplier > 1 || config.visualClarityBoost;
  if (!warningSupportActive) {
    if (warningIndicators.length > 0) clearWarningIndicators();
    return;
  }

  const warningKinds = new Set(["fire", "tar", "hand", "ash", "wall"]);
  for (const obstacle of obstacles) {
    if (!warningKinds.has(obstacle.kind)) continue;
    if (obstacle.kind === "fire" && obstacle.extinguished) continue;
    if (obstacle.kind === "ash" && obstacle.hit) continue;
    const warningTime = getObstacleWarningTime(obstacle);
    const maxWarningTime = 4.2 * config.warningTimeMultiplier;
    if (warningTime < -0.12 || warningTime > maxWarningTime) continue;
    if (!obstacle.warningIndicator && warningTime >= 0.15) {
      obstacle.warningIndicator = createWarningIndicator(obstacle);
      warningIndicators.push(obstacle.warningIndicator);
    }
    if (obstacle.warningIndicator) {
      positionWarningIndicator(obstacle.warningIndicator, obstacle, dt);
    }
  }

  warningIndicators = warningIndicators.filter((indicator) => {
    const obstacle = indicator.obstacle;
    const warningTime = obstacle ? getObstacleWarningTime(obstacle) : Infinity;
    const keep =
      obstacles.includes(obstacle) &&
      warningTime >= -0.12 &&
      warningTime <= 4.35 * getAdaptationConfig().warningTimeMultiplier &&
      warningSupportActive;
    if (!keep) {
      removeWarningIndicator(indicator);
      if (obstacle) obstacle.warningIndicator = null;
    }
    return keep;
  });
}

function getObstacleWarningTime(obstacle) {
  if (!obstacle) return Infinity;
  const halfSpan = obstacle.kind === "hand"
    ? obstacle.proximityZ || obstacle.zSpan * 0.5
    : obstacle.zSpan * 0.5;
  const contactZ = obstacle.z + halfSpan;
  const distanceToContact = player.z - contactZ;
  const runnerClosing = BASE_RUN_SPEED * getAdaptationConfig().movementIntensityMultiplier * Math.max(0.2, speed) * (1 + boostPulse * (BOOST_SPEED_MULTIPLIER - 1)) * getSpeedPadMultiplier();
  const obstacleClosing = obstacle.kind === "ash" ? obstacle.flySpeed + speed * 4.6 : 0;
  return distanceToContact / Math.max(1, runnerClosing + obstacleClosing);
}

function createWarningIndicator(obstacle) {
  const group = new THREE.Group();
  group.name = `${obstacle.kind}-early-warning`;
  const previews = [];
  const previewCount = 4;
  const previewSpacing = getWarningPreviewSpacing(obstacle);

  if (obstacle.kind === "tar") {
    for (let i = 0; i < previewCount; i += 1) {
      const material = createGhostMaterial(0xff2f2f, 0.34);
      const previewHazard = {
        ...obstacle,
        z: obstacle.z + previewSpacing * (i + 1),
      };
      const ghost = new THREE.Mesh(
        createTarSurfaceGeometry(previewHazard, TUBE_RADIUS - 0.1, obstacle.type === "river" ? 24 : 14, 10, true),
        material,
      );
      ghost.name = "tar-warning-ghost-copy";
      group.add(ghost);
      previews.push({ object: ghost, materials: [material], index: i, worldGeometry: true });
    }
    group.userData.worldGeometry = true;
  } else {
    for (let i = 0; i < previewCount; i += 1) {
      const copy = new THREE.Group();
      copy.name = `${obstacle.kind}-warning-ghost-copy`;
      copy.position.z = -previewSpacing * (i + 1);
      const copyMaterials = [];
      const add = (mesh) => {
        copy.add(mesh);
        if (mesh.material) copyMaterials.push(mesh.material);
        return mesh;
      };

      if (obstacle.kind === "fire") {
        buildFireWarningGhost(obstacle, add);
      } else if (obstacle.kind === "hand") {
        buildHandWarningGhost(obstacle, add);
      } else if (obstacle.kind === "ash") {
        buildAshWarningGhost(obstacle, add);
      } else if (obstacle.kind === "wall") {
        buildWallWarningGhost(obstacle, add);
      }

      group.add(copy);
      previews.push({ object: copy, materials: copyMaterials, index: i, worldGeometry: false });
    }
  }

  warningGroup.add(group);
  return {
    obstacle,
    group,
    previews,
    phase: Math.random() * TAU,
  };
}

function getWarningPreviewSpacing(obstacle) {
  if (obstacle.kind === "hand") {
    return THREE.MathUtils.clamp((obstacle.proximityZ || 13) * 0.34, 7.5, 12);
  }
  if (obstacle.kind === "fire") {
    return THREE.MathUtils.clamp(obstacle.zSpan * 0.72, 7.5, 11);
  }
  if (obstacle.kind === "tar") {
    return THREE.MathUtils.clamp(obstacle.zSpan * 0.34, 7, 13);
  }
  if (obstacle.kind === "ash") {
    return THREE.MathUtils.clamp((obstacle.radius || 1) * 7.5, 6.5, 10);
  }
  if (obstacle.kind === "wall") {
    return THREE.MathUtils.clamp(obstacle.zSpan * 1.4, 7, 10.5);
  }
  return 8.5;
}

function buildFireWarningGhost(obstacle, add) {
  const logMaterial = createGhostMaterial(0x42ff83, 0.34);
  const flameMaterial = createGhostMaterial(0xa8ffd1, 0.43);
  const glowMaterial = createGhostMaterial(0x19ff68, 0.26);

  const glow = add(new THREE.Mesh(new THREE.CircleGeometry(1, 34), glowMaterial));
  glow.name = "fire-warning-glow";
  glow.rotation.x = -Math.PI * 0.5;
  glow.position.y = 0.04;
  glow.scale.set(obstacle.pileHalfWidth * 1.35, obstacle.zSpan * 0.56, 1);

  for (let i = 0; i < 9; i += 1) {
    const log = add(new THREE.Mesh(shared.tobaccoChunkGeometry, logMaterial));
    const t = i / 8;
    log.name = "fire-warning-tobacco-log";
    log.position.set(
      Math.sin(i * 2.3) * obstacle.pileHalfWidth * 0.62,
      0.34 + (i % 3) * 0.08,
      (t - 0.5) * obstacle.zSpan * 0.68,
    );
    log.rotation.set(1.15, i * 0.74, Math.sin(i) * 0.55);
    log.scale.set(1.45, 2.8, 1.1);
  }

  for (let i = 0; i < 7; i += 1) {
    const flame = add(new THREE.Mesh(shared.flameGeometry, flameMaterial));
    flame.name = "fire-warning-flame";
    flame.position.set(
      Math.sin(i * 1.7) * obstacle.pileHalfWidth * 0.52,
      1.08,
      Math.cos(i * 2.1) * obstacle.zSpan * 0.22,
    );
    flame.scale.set(1.1, 2.4, 0.9);
    flame.rotation.y = i * 0.6;
  }
}

function buildHandWarningGhost(obstacle, add) {
  const handMaterial = createGhostMaterial(0xff2b2b, 0.36);
  const palmMaterial = createGhostMaterial(0xff7878, 0.42);
  const handScale = obstacle.handScale || 2;

  const wrist = add(new THREE.Mesh(shared.handWristGeometry, handMaterial));
  wrist.name = "hand-warning-wrist";
  wrist.position.y = 0.92 * handScale;
  wrist.scale.set(handScale * 1.08, handScale * 1.9, handScale * 1.08);

  const palm = add(new THREE.Mesh(shared.handPalmGeometry, palmMaterial));
  palm.name = "hand-warning-palm";
  palm.position.y = 1.95 * handScale;
  palm.scale.set(handScale * 1.2, handScale * 0.88, handScale * 0.56);

  const fingerOffsets = [-0.52, -0.18, 0.18, 0.52];
  for (const [index, x] of fingerOffsets.entries()) {
    const finger = add(new THREE.Mesh(shared.handFingerGeometry, handMaterial));
    finger.name = "hand-warning-finger";
    finger.position.set(x * handScale, (2.58 + index * 0.06) * handScale, 0.04 * handScale);
    finger.rotation.z = x * 0.48;
    finger.scale.set(handScale * 1.04, handScale * (1.0 + index * 0.12), handScale * 1.04);
  }

  const thumb = add(new THREE.Mesh(shared.handFingerGeometry, handMaterial));
  thumb.name = "hand-warning-thumb";
  thumb.position.set(0.76 * handScale, 1.82 * handScale, 0.08 * handScale);
  thumb.rotation.z = -1.05;
  thumb.rotation.x = 0.45;
  thumb.scale.set(handScale * 1.04, handScale * 0.9, handScale * 1.04);
}

function buildAshWarningGhost(obstacle, add) {
  const rockMaterial = createGhostMaterial(0xff3030, 0.36);
  const hotMaterial = createGhostMaterial(0xff9999, 0.46);
  const rock = add(new THREE.Mesh(shared.ashGeometry, rockMaterial));
  rock.name = "ash-warning-asteroid";
  rock.scale.set(obstacle.radius * 1.35, obstacle.radius * 1.08, obstacle.radius * 1.22);

  for (let i = 0; i < 5; i += 1) {
    const ember = add(new THREE.Mesh(shared.tobaccoClumpGeometry, hotMaterial));
    ember.name = "ash-warning-hot-spot";
    ember.position.set(
      Math.sin(i * 2.1) * obstacle.radius * 0.72,
      Math.cos(i * 1.4) * obstacle.radius * 0.52,
      Math.sin(i * 1.3) * obstacle.radius * 0.66,
    );
    ember.scale.setScalar(obstacle.radius * 0.18);
  }
}

function buildWallWarningGhost(obstacle, add) {
  const wallMaterial = createGhostMaterial(0xff3030, 0.32, false);
  const edgeMaterial = createGhostMaterial(0xff8888, 0.38, false);
  const slab = add(new THREE.Mesh(
    createCollapsedWallGeometry(obstacle, 0.16, 1.02, 18, 4, 1),
    wallMaterial,
  ));
  slab.name = "wall-warning-collapsed-slab";

  const previewWidth = obstacle.wallChordWidth || obstacle.wallWidth;
  for (let i = 0; i < 7; i += 1) {
    const shard = add(new THREE.Mesh(
      new THREE.BoxGeometry(previewWidth * 0.1, obstacle.wallHeight * (0.42 + i * 0.06), 0.08),
      edgeMaterial,
    ));
    shard.name = "wall-warning-torn-edge";
    shard.position.set(
      -previewWidth * 0.42 + i * previewWidth * 0.14,
      shard.geometry.parameters.height * 0.5,
      -obstacle.zSpan * 0.54,
    );
    shard.rotation.z = (i - 2) * 0.035;
  }
}

function positionWarningIndicator(indicator, obstacle, dt) {
  if (indicator.group.userData.worldGeometry) {
    indicator.group.position.set(0, 0, 0);
    indicator.group.quaternion.identity();
  } else if (obstacle.group) {
    obstacle.group.updateMatrixWorld(true);
    indicator.group.position.copy(obstacle.group.position);
    indicator.group.quaternion.copy(obstacle.group.quaternion);
  }

  const time = performance.now() * 0.001;
  let anyPreviewVisible = false;
  for (const preview of indicator.previews || []) {
    const phase = indicator.phase + preview.index * 0.72;
    const blink = Math.sin(time * 8.6 + phase);
    const visible = blink > -0.2;
    const pulse = 0.82 + Math.sin(time * 5.4 + phase) * 0.12;
    preview.object.visible = visible;
    anyPreviewVisible = anyPreviewVisible || visible;
    if (!preview.worldGeometry) {
      preview.object.scale.setScalar(pulse);
    }
    for (const material of preview.materials) {
      const baseOpacity = material.userData.baseOpacity || 0.3;
      material.opacity = visible ? baseOpacity * (0.62 + Math.max(0, blink) * 0.56) : 0;
    }
  }
  indicator.group.visible = anyPreviewVisible;
}

function clearWarningIndicators() {
  for (const indicator of warningIndicators) {
    if (indicator.obstacle) indicator.obstacle.warningIndicator = null;
    removeWarningIndicator(indicator);
  }
  warningIndicators = [];
}

function removeWarningIndicator(indicator) {
  if (!indicator || !indicator.group) return;
  warningGroup.remove(indicator.group);
  const disposedMaterials = new Set();
  const disposedGeometries = new Set();
  indicator.group.traverse((child) => {
    if (child.isSprite) {
      disposeSprite(child);
      return;
    }
    if (child.geometry && !disposedGeometries.has(child.geometry)) {
      child.geometry.dispose();
      disposedGeometries.add(child.geometry);
    }
    if (child.material && !disposedMaterials.has(child.material)) {
      child.material.dispose();
      disposedMaterials.add(child.material);
    }
  });
}

function updateSmoke(dt) {
  smoke = smoke.filter((puff) => {
    puff.life -= dt * 0.34;
    puff.mesh.position.addScaledVector(puff.drift, dt);
    puff.mesh.scale.addScalar(dt * 0.22);
    puff.mesh.material.opacity = Math.max(0, puff.life * (puff.maxOpacity || 0.16));
    const keep = puff.life > 0 && puff.mesh.position.z < player.z + 18;
    if (!keep) {
      smokeGroup.remove(puff.mesh);
      puff.mesh.material.dispose();
    }
    return keep;
  });
}

function positionRunnerOnTube(object, angle, z, inset) {
  const frame = getSurfaceFrame(angle, z, inset);
  const basis = new THREE.Matrix4().makeBasis(frame.right, frame.up, frame.forward);
  object.position.copy(frame.root);
  object.quaternion.setFromRotationMatrix(basis);
}

function getSurfaceFrame(angle, z, inset = 0) {
  const radial = radialFromAngle(angle);
  const up = radial.clone().multiplyScalar(-1);
  const forward = new THREE.Vector3(0, 0, -1);
  const right = up.clone().cross(forward).normalize();
  const root = radial.clone().multiplyScalar(TUBE_RADIUS - inset);
  root.z = z;
  return { root, radial, right, up, forward };
}

function radialFromAngle(angle) {
  return new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
}

function wrapAngle(angle) {
  return ((angle % TAU) + TAU) % TAU;
}

function angleDelta(a, b) {
  let diff = wrapAngle(a) - wrapAngle(b);
  if (diff > Math.PI) diff -= TAU;
  if (diff < -Math.PI) diff += TAU;
  return diff;
}

function isLikelyMobileDevice() {
  return (navigator.maxTouchPoints || 0) > 0 || window.matchMedia?.("(pointer: coarse)")?.matches;
}

function getRendererPixelRatio() {
  const maxRatio = isLikelyMobileDevice() ? 1.5 : 2;
  return Math.min(window.devicePixelRatio || 1, maxRatio);
}

function getViewportDimensions() {
  const viewport = window.visualViewport;
  return {
    width: Math.max(1, Math.floor(viewport?.width || window.innerWidth || 1)),
    height: Math.max(1, Math.floor(viewport?.height || window.innerHeight || 1)),
  };
}

function updateViewportCssVars(width, height) {
  document.documentElement.style.setProperty("--app-width", `${width}px`);
  document.documentElement.style.setProperty("--app-height", `${height}px`);
}

function resize() {
  const { width, height } = getViewportDimensions();
  updateViewportCssVars(width, height);
  renderer.setPixelRatio(getRendererPixelRatio());
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function loop(time) {
  tick(time);
  requestAnimationFrame(loop);
}

function tick(time) {
  lastFrameAt = performance.now();
  const dt = Math.min(0.033, (time - lastTime) / 1000 || 0);
  lastTime = time;
  update(dt);
  renderer.render(scene, camera);
}

function createAudioGraph() {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  musicGain = audioCtx.createGain();
  sfxGain = audioCtx.createGain();
  masterGain.gain.value = audioMuted ? 0 : 0.78;
  musicGain.gain.value = 0.32;
  sfxGain.gain.value = 0.62;
  musicGain.connect(masterGain);
  sfxGain.connect(masterGain);
  masterGain.connect(audioCtx.destination);
}

function isAudioRunning() {
  return Boolean(audioCtx && audioCtx.state === "running");
}

function canPlayAudioNode(targetGain) {
  if (!audioCtx || !targetGain || audioMuted) return false;
  return isAudioRunning();
}

function playAudioUnlockPulse({ audible = false } = {}) {
  if (!audioCtx) return;
  try {
    const startAt = audioCtx.currentTime;
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const peak = audible ? 0.045 : 0.003;
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(660, startAt);
    oscillator.frequency.exponentialRampToValueAtTime(880, startAt + 0.055);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(peak, startAt + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.085);
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + 0.095);
  } catch (error) {
    // Some browsers throw if a previous gesture already unlocked audio; this is harmless.
  }
}

function unlockAudioContext({ audible = false } = {}) {
  createAudioGraph();
  if (!audioCtx) return Promise.resolve(false);
  if (isAudioRunning()) {
    if (audible) playAudioUnlockPulse({ audible: true });
    return Promise.resolve(true);
  }
  if (!audioUnlockPromise) {
    audioUnlockPromise = audioCtx.resume()
      .then(() => isAudioRunning())
      .catch(() => false)
      .finally(() => {
        audioUnlockPromise = null;
      });
  }
  return audioUnlockPromise.then((ready) => {
    if (ready) playAudioUnlockPulse({ audible });
    return ready;
  });
}

function startAudio({ music = true, audibleUnlock = false } = {}) {
  return unlockAudioContext({ audible: audibleUnlock }).then((ready) => {
    if (ready && music) startMusic();
    return ready;
  });
}

function startMusic() {
  if (!audioCtx || musicNodes.length > 0) return;

  const padGain = audioCtx.createGain();
  padGain.gain.value = 0.014;
  padGain.connect(musicGain);

  for (const [frequency, type, detune] of [
    [98, "triangle", -6],
    [196, "sine", 5],
    [293.66, "triangle", -3],
  ]) {
    const oscillator = audioCtx.createOscillator();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.detune.value = detune;
    oscillator.connect(padGain);
    oscillator.start();
    musicNodes.push(oscillator);
  }

  musicStep = 0;
  musicPhraseIndex = 0;
  musicTimer = window.setInterval(() => {
    if (!audioCtx || state !== "running" || audioMuted) return;
    const phrases = [
      [587.33, 783.99, 880, 987.77, 880, 783.99, 659.25, 783.99, 523.25, 659.25, 783.99, 880, 987.77, 880, 783.99, 659.25],
      [659.25, 880, 987.77, 1174.66, 987.77, 880, 783.99, 659.25, 587.33, 783.99, 880, 987.77, 880, 783.99, 659.25, 587.33],
      [493.88, 659.25, 783.99, 880, 783.99, 659.25, 587.33, 493.88, 523.25, 659.25, 783.99, 987.77, 880, 783.99, 659.25, 523.25],
      [783.99, 987.77, 1174.66, 987.77, 880, 783.99, 659.25, 783.99, 880, 987.77, 880, 783.99, 659.25, 587.33, 659.25, 783.99],
    ];
    const bass = [98, 98, 146.83, 146.83, 110, 110, 164.81, 146.83];
    const offbeatChord = [392, 493.88, 587.33, 659.25];
    if (musicStep > 0 && musicStep % 16 === 0) {
      musicPhraseIndex = (musicPhraseIndex + 1 + Math.floor(Math.random() * (phrases.length - 1))) % phrases.length;
    }
    const step = musicStep % 16;
    const frequency = phrases[musicPhraseIndex][step];
    if (frequency) {
      const accent = step % 4 === 0;
      playMusicTone(frequency, accent ? 0.07 : 0.052, step % 3 === 0 ? "sine" : "triangle", accent ? 0.034 : 0.026);
      if (step % 2 === 1) playMusicTone(frequency * 1.5, 0.038, "sine", 0.01, 0.022);
      if (step % 8 === 6) playMusicTone(frequency * 2, 0.034, "triangle", 0.009, 0.036);
    }
    if (musicStep % 4 === 0) {
      const root = bass[Math.floor(musicStep / 4) % bass.length];
      playMusicTone(root, 0.088, "sine", 0.04);
      playMusicTone(root * 0.5, 0.06, "triangle", 0.026);
      playMusicNoise(0.018, 0.0055, 0.012);
    } else if (musicStep % 4 === 2) {
      playMusicTone(bass[Math.floor(musicStep / 4) % bass.length] * 1.5, 0.046, "triangle", 0.025);
    }
    if (musicStep % 4 === 1 || musicStep % 4 === 3) {
      const chordRoot = offbeatChord[Math.floor(musicStep / 8) % offbeatChord.length];
      playMusicTone(chordRoot, 0.038, "triangle", 0.012);
      playMusicTone(chordRoot * 1.25, 0.038, "sine", 0.008, 0.004);
    }
    if (musicStep % 2 === 1) {
      playMusicNoise(0.012, 0.0038);
    }
    musicStep += 1;
  }, 92);
}

function stopMusic() {
  for (const node of musicNodes) {
    try {
      node.stop();
    } catch (error) {
      // Oscillators may already have stopped if the browser suspends audio.
    }
  }
  musicNodes = [];
  if (musicTimer) {
    window.clearInterval(musicTimer);
    musicTimer = null;
  }
}

function setAudioMuted(muted) {
  audioMuted = muted;
  if (masterGain) {
    masterGain.gain.setTargetAtTime(audioMuted ? 0 : 0.78, audioCtx.currentTime, 0.03);
  }
  if (volumeButton) {
    volumeButton.classList.toggle("muted", audioMuted);
  }
}

function playMusicTone(frequency, duration, type = "sine", volume = 0.03, delay = 0) {
  if (!canPlayAudioNode(musicGain)) return;
  const startAt = audioCtx.currentTime + delay;
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.connect(gain);
  gain.connect(musicGain);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.035);
}

function playMusicNoise(duration = 0.02, volume = 0.006, delay = 0) {
  if (!canPlayAudioNode(musicGain)) return;
  const sampleRate = audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 1.5;
  }
  const source = audioCtx.createBufferSource();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();
  const startAt = audioCtx.currentTime + delay;
  source.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(4200, startAt);
  filter.Q.setValueAtTime(0.75, startAt);
  gain.gain.setValueAtTime(volume, startAt);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(musicGain);
  source.start(startAt);
}

function playTone(frequency, duration, type = "sine", volume = 0.12, delay = 0) {
  if (!canPlayAudioNode(sfxGain)) return;
  const startAt = audioCtx.currentTime + delay;
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.connect(gain);
  gain.connect(sfxGain);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.04);
}

function playNoise(duration = 0.18, volume = 0.12, delay = 0) {
  if (!canPlayAudioNode(sfxGain)) return;
  const sampleRate = audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const source = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();
  const startAt = audioCtx.currentTime + delay;
  source.buffer = buffer;
  gain.gain.setValueAtTime(volume, startAt);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  source.connect(gain);
  gain.connect(sfxGain);
  source.start(startAt);
}

function playFilteredNoise({
  duration = 0.18,
  volume = 0.08,
  delay = 0,
  type = "bandpass",
  frequency = 900,
  endFrequency = frequency,
  q = 1.1,
} = {}) {
  if (!canPlayAudioNode(sfxGain)) return;
  const sampleRate = audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    const t = i / Math.max(1, data.length - 1);
    data[i] = (Math.random() * 2 - 1) * (1 - t) ** 1.35;
  }

  const source = audioCtx.createBufferSource();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();
  const startAt = audioCtx.currentTime + delay;
  const endAt = startAt + duration;
  source.buffer = buffer;
  filter.type = type;
  filter.frequency.setValueAtTime(Math.max(20, frequency), startAt);
  filter.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), endAt);
  filter.Q.setValueAtTime(q, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, endAt);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(sfxGain);
  source.start(startAt);
}

function playToneSweep(frequency, endFrequency, duration, type = "sine", volume = 0.08, delay = 0) {
  if (!canPlayAudioNode(sfxGain)) return;
  const startAt = audioCtx.currentTime + delay;
  const endAt = startAt + duration;
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(Math.max(20, frequency), startAt);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), endAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, endAt);
  oscillator.connect(gain);
  gain.connect(sfxGain);
  oscillator.start(startAt);
  oscillator.stop(endAt + 0.04);
}

function playButtonSound() {
  playTone(220, 0.08, "triangle", 0.08);
  playTone(440, 0.12, "sine", 0.08, 0.06);
}

function playExtinguishSound() {
  playNoise(0.22, 0.16);
  playTone(523.25, 0.12, "sine", 0.12, 0.03);
  playTone(783.99, 0.18, "triangle", 0.08, 0.11);
}

function playMilestoneSound() {
  playTone(392, 0.1, "triangle", 0.12);
  playTone(587.33, 0.12, "triangle", 0.1, 0.08);
  playTone(783.99, 0.16, "sine", 0.08, 0.17);
}

function playWaterCollectSound() {
  playNoise(0.08, 0.08);
  playTone(659.25, 0.08, "sine", 0.1);
  playTone(987.77, 0.12, "triangle", 0.08, 0.06);
}

function playWaterPoolSound() {
  playNoise(0.12, 0.055);
  playTone(349.23, 0.08, "sine", 0.045);
  playTone(523.25, 0.1, "triangle", 0.04, 0.04);
}

function playWaterBopSound(targetBlend = 0) {
  const focus = THREE.MathUtils.clamp(targetBlend, 0, 1);
  playTone(392 + focus * 110, 0.045, "sine", 0.028 + focus * 0.012);
  playTone(196 + focus * 55, 0.04, "triangle", 0.018, 0.035);
}

function playSizeShrinkSound() {
  playTone(392, 0.08, "triangle", 0.07);
  playTone(277.18, 0.12, "sawtooth", 0.055, 0.06);
  playNoise(0.06, 0.035, 0.02);
}

function playSizeGrowSound() {
  playTone(392, 0.08, "sine", 0.06);
  playTone(523.25, 0.1, "triangle", 0.065, 0.06);
  playTone(783.99, 0.08, "sine", 0.045, 0.13);
}

function playPowerupCollectSound() {
  playNoise(0.08, 0.07);
  playTone(440, 0.08, "square", 0.08);
  playTone(659.25, 0.1, "triangle", 0.06, 0.06);
}

function playRouletteTickSound() {
  playTone(880, 0.035, "square", 0.026);
}

function playPowerupLandSound() {
  playTone(523.25, 0.08, "triangle", 0.09);
  playTone(783.99, 0.1, "triangle", 0.08, 0.07);
  playTone(1046.5, 0.16, "sine", 0.065, 0.15);
}

function playNextBuffRevealSound() {
  playFilteredNoise({
    duration: 0.18,
    volume: 0.06,
    type: "bandpass",
    frequency: 1200,
    endFrequency: 2400,
    q: 0.9,
  });
  playTone(392, 0.08, "triangle", 0.07);
  playTone(587.33, 0.1, "triangle", 0.075, 0.06);
  playTone(880, 0.12, "sine", 0.066, 0.14);
  playTone(1174.66, 0.16, "sine", 0.052, 0.24);
}

function playBackpackSound() {
  playNoise(0.16, 0.09);
  playTone(329.63, 0.12, "sine", 0.075);
  playTone(659.25, 0.18, "triangle", 0.065, 0.08);
}

function playBackpackVanishSound() {
  playNoise(0.1, 0.055);
  playTone(523.25, 0.08, "triangle", 0.045);
  playTone(261.63, 0.12, "sine", 0.045, 0.07);
}

function playTarBubbleSound() {
  playNoise(0.16, 0.06);
  playTone(73.42, 0.13, "sawtooth", 0.055);
  playTone(98, 0.1, "triangle", 0.045, 0.08);
}

function playHandMoveSound(amount = 1) {
  const strength = THREE.MathUtils.clamp(amount, 0, 1);
  const baseVolume = 0.028 + strength * 0.045;
  const creakStart = THREE.MathUtils.randFloat(82, 118);
  const creakEnd = THREE.MathUtils.randFloat(46, 68);
  playFilteredNoise({
    duration: 0.18,
    volume: baseVolume * 0.54,
    type: "lowpass",
    frequency: 620 + strength * 260,
    endFrequency: 260,
    q: 0.82,
  });
  playFilteredNoise({
    duration: 0.11,
    volume: baseVolume * 0.32,
    delay: 0.035,
    type: "bandpass",
    frequency: 1350,
    endFrequency: 720,
    q: 0.7,
  });
  playToneSweep(creakStart, creakEnd, 0.22, "triangle", baseVolume * 0.6);
  playToneSweep(creakStart * 0.62, creakEnd * 0.72, 0.18, "sine", baseVolume * 0.34, 0.055);
}

function playAsteroidWhooshSound(amount = 1) {
  const strength = THREE.MathUtils.clamp(amount, 0, 1);
  const volume = 0.035 + strength * 0.065;
  playFilteredNoise({
    duration: 0.18,
    volume,
    type: "bandpass",
    frequency: 1850 - strength * 620,
    endFrequency: 360 + strength * 150,
    q: 0.55,
  });
  playFilteredNoise({
    duration: 0.24,
    volume: volume * 0.38,
    delay: 0.015,
    type: "lowpass",
    frequency: 420,
    endFrequency: 130,
    q: 0.7,
  });
  playToneSweep(155 + strength * 70, 88 + strength * 26, 0.2, "triangle", volume * 0.34);
}

function playBoostSound() {
  playNoise(0.08, 0.08);
  playTone(440, 0.06, "triangle", 0.07);
  playTone(880, 0.1, "sine", 0.052, 0.05);
}

function playSideDashSound() {
  playNoise(0.055, 0.06);
  playTone(523.25, 0.045, "triangle", 0.06);
  playTone(987.77, 0.075, "sine", 0.045, 0.035);
}

function playMoistureWarningSound() {
  playTone(196, 0.08, "square", 0.08);
  playTone(174.61, 0.11, "square", 0.06, 0.1);
}

function playMoistureEmptySound() {
  playNoise(0.32, 0.13);
  playTone(220, 0.16, "sawtooth", 0.1);
  playTone(164.81, 0.22, "sawtooth", 0.1, 0.14);
  playTone(110, 0.38, "triangle", 0.09, 0.32);
}

function playAshHitSound() {
  playNoise(0.26, 0.22);
  playTone(123.47, 0.18, "sawtooth", 0.14);
  playTone(82.41, 0.22, "square", 0.1, 0.08);
}

function playImpactSound() {
  playNoise(0.24, 0.16);
  playTone(146.83, 0.2, "sawtooth", 0.11);
}

function playCaughtSound() {
  playNoise(0.1, 0.08);
  playTone(783.99, 0.09, "square", 0.11);
  playTone(659.25, 0.1, "square", 0.1, 0.1);
  playTone(523.25, 0.12, "triangle", 0.1, 0.21);
  playTone(261.63, 0.34, "sawtooth", 0.12, 0.36);
}

function playResultTickSound(index) {
  playTone(260 + index * 65, 0.07, "square", 0.045);
}

function playResultCompleteSound(index) {
  playTone(392 + index * 98, 0.16, "triangle", 0.11);
  playTone(784 + index * 55, 0.22, "sine", 0.06, 0.08);
}

function setTouchButtonActive(button, active) {
  if (button) button.classList.toggle("active", Boolean(active));
}

function recordSideMoveTap(direction) {
  if (state !== "running") return;
  const now = performance.now() * 0.001;
  const key = direction < 0 ? "left" : "right";
  if (now - lastSideTap[key] <= SIDE_DASH_TAP_WINDOW) {
    triggerSideDash(direction);
    lastSideTap[key] = -999;
    return;
  }
  lastSideTap[key] = now;
}

function triggerSideDash(direction) {
  if (state !== "running" || player.crushed || sideDashCooldown > 0) return;

  const tarDrag = player.tarContact > 0 ? 0.78 : 1;
  const dashAngle = SIDE_DASH_ANGLE * tarDrag;
  sideDashCooldown = SIDE_DASH_COOLDOWN;
  sideDashPulse = 1;
  player.targetAngle = wrapAngle(player.targetAngle + direction * dashAngle);
  player.angle = wrapAngle(player.angle + direction * dashAngle * 0.62);
  player.slideVelocity = direction * 0.18;
  addPlayerSplash(16);
  playSideDashSound();
}

function bindHoldButton(button, onPress, onRelease) {
  if (!button) return;
  const press = (event) => {
    event.preventDefault();
    event.stopPropagation();
    button.setPointerCapture?.(event.pointerId);
    onPress();
  };
  const release = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onRelease();
  };
  button.addEventListener("pointerdown", press);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("pointerleave", release);
}

function updateMobileTouchZoneState(direction) {
  if (!mobileTouchZones) return;
  mobileTouchZones.classList.toggle("pressing-left", direction < 0);
  mobileTouchZones.classList.toggle("pressing-right", direction > 0);
}

function setMobileTouchDirection(direction, pointerId) {
  if (state !== "running") return;
  const normalized = direction < 0 ? -1 : 1;
  activeTouchPointerId = pointerId;
  activeTouchDirection = normalized;
  touchSteer = normalized;
  updateMobileTouchZoneState(normalized);
}

function stopMobileTouchDirection(pointerId = null, force = false) {
  if (!force && activeTouchPointerId !== null && pointerId !== activeTouchPointerId) return;
  activeTouchPointerId = null;
  activeTouchDirection = 0;
  touchSteer = 0;
  updateMobileTouchZoneState(0);
}

function getTouchDirectionFromX(clientX) {
  return clientX < getViewportDimensions().width * 0.5 ? -1 : 1;
}

function bindMovementZone(zone, direction) {
  if (!zone) return;

  zone.addEventListener("pointerdown", (event) => {
    if (state !== "running") return;
    event.preventDefault();
    event.stopPropagation();
    if (activeTouchPointerId !== null && activeTouchPointerId !== event.pointerId) return;
    zone.setPointerCapture?.(event.pointerId);
    setMobileTouchDirection(direction, event.pointerId);
  });

  zone.addEventListener("pointermove", (event) => {
    if (state !== "running" || activeTouchPointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    setMobileTouchDirection(getTouchDirectionFromX(event.clientX), event.pointerId);
  });

  const release = (event) => {
    if (activeTouchPointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    stopMobileTouchDirection(event.pointerId);
  };

  zone.addEventListener("pointerup", release);
  zone.addEventListener("pointercancel", release);
  zone.addEventListener("lostpointercapture", release);
}

function preventGameplayGesture(event) {
  if (state === "running") {
    event.preventDefault();
  }
}

function stopAllTouchMovement() {
  stopMobileTouchDirection(null, true);
  touchSteer = 0;
  boostActive = false;
  setTouchButtonActive(touchLeftButton, false);
  setTouchButtonActive(touchRightButton, false);
  setTouchButtonActive(touchBoostButton, false);
}

function primeAudioFromUserGesture() {
  if (audioMuted || isAudioRunning()) return;
  startAudio({ music: state === "running", audibleUnlock: false }).then((ready) => {
    if (ready && state === "running") applyRunAudioProfile();
  });
}

function primeAudioForPlayIntent() {
  if (audioMuted || isAudioRunning()) return;
  const now = performance.now();
  if (now - lastDirectAudioUnlockAt < 260) return;
  lastDirectAudioUnlockAt = now;
  startAudio({ music: state === "running", audibleUnlock: true }).then((ready) => {
    if (ready && state === "running") applyRunAudioProfile();
  });
}

window.addEventListener("resize", resize);
window.visualViewport?.addEventListener("resize", resize);
window.visualViewport?.addEventListener("scroll", resize);
window.addEventListener("orientationchange", () => window.setTimeout(resize, 80));
window.addEventListener("pointerdown", primeAudioFromUserGesture, { passive: true });
window.addEventListener("touchstart", primeAudioFromUserGesture, { passive: true });
window.addEventListener("touchend", primeAudioFromUserGesture, { passive: true });
window.addEventListener("keydown", (event) => {
  if ((event.code === "Space" || event.code === "Enter") && (state === "menu" || state === "over")) {
    event.preventDefault();
    handlePlayRequest();
  }
});
window.addEventListener("keyup", (event) => {
  keys.delete(event.code);
});

document.addEventListener("touchmove", preventGameplayGesture, { passive: false });
document.addEventListener("gesturestart", preventGameplayGesture, { passive: false });
document.addEventListener("gesturechange", preventGameplayGesture, { passive: false });
document.addEventListener("gestureend", preventGameplayGesture, { passive: false });
document.addEventListener("dblclick", preventGameplayGesture, { passive: false });
document.addEventListener("selectstart", preventGameplayGesture);
document.addEventListener("pointerup", (event) => stopMobileTouchDirection(event.pointerId));
document.addEventListener("pointercancel", (event) => stopMobileTouchDirection(event.pointerId));
window.addEventListener("blur", stopAllTouchMovement);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopAllTouchMovement();
});

startButton.addEventListener("pointerdown", primeAudioForPlayIntent, { passive: true });
startButton.addEventListener("touchstart", primeAudioForPlayIntent, { passive: true });
restartButton.addEventListener("pointerdown", primeAudioForPlayIntent, { passive: true });
restartButton.addEventListener("touchstart", primeAudioForPlayIntent, { passive: true });
startButton.addEventListener("click", handlePlayRequest);
restartButton.addEventListener("click", startRun);
for (const { key } of SYMPTOM_DEFINITIONS) {
  symptomControls[key]?.input?.addEventListener("input", updateSymptomSurveyValues);
}
if (symptomSurveyForm) {
  symptomSurveyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCurrentSurvey();
  });
}
if (skipSurveyButton) {
  skipSurveyButton.addEventListener("click", skipSurveyForNextRun);
}
if (viewProgressMenuButton) {
  viewProgressMenuButton.addEventListener("click", openProgressScreen);
}
if (viewProgressResultsButton) {
  viewProgressResultsButton.addEventListener("click", openProgressScreen);
}
if (closeProgressButton) {
  closeProgressButton.addEventListener("click", closeProgressScreen);
}
for (const button of progressRangeButtons) {
  button.addEventListener("click", () => {
    progressRange = button.dataset.progressRange || "week";
    renderProgressGraph();
  });
}
if (screenshotProgressButton && progressOverlay) {
  screenshotProgressButton.addEventListener("click", () => {
    progressOverlay.classList.toggle("screenshot-ready");
    screenshotProgressButton.textContent = progressOverlay.classList.contains("screenshot-ready")
      ? "Exit Screenshot View"
      : "Screenshot for GP";
  });
}
if (resetStatisticsButton) {
  resetStatisticsButton.addEventListener("click", openResetStatsModal);
}
if (cancelResetStatsButton) {
  cancelResetStatsButton.addEventListener("click", closeResetStatsModal);
}
if (resetStatsConfirmInput) {
  resetStatsConfirmInput.addEventListener("input", updateResetStatsConfirmState);
  resetStatsConfirmInput.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Enter" && resetStatsConfirmInput.value.trim() === "YES") {
      resetSymptomStatistics();
    }
    if (event.key === "Escape") {
      closeResetStatsModal();
    }
  });
}
if (confirmResetStatsButton) {
  confirmResetStatsButton.addEventListener("click", resetSymptomStatistics);
}
if (resetStatsModal) {
  resetStatsModal.addEventListener("click", (event) => {
    if (event.target === resetStatsModal) closeResetStatsModal();
  });
}
if (tutorialNextButton) {
  tutorialNextButton.addEventListener("click", advanceTutorial);
}
if (tutorialSkipButton) {
  tutorialSkipButton.addEventListener("click", skipTutorial);
}
if (controlsButton) {
  controlsButton.addEventListener("click", showTutorial);
}
bindMovementZone(touchZoneLeft, -1);
bindMovementZone(touchZoneRight, 1);
bindHoldButton(
  touchLeftButton,
  () => {
    recordSideMoveTap(-1);
    touchSteer = -1;
    setTouchButtonActive(touchLeftButton, true);
  },
  () => {
    if (touchSteer < 0) touchSteer = 0;
    setTouchButtonActive(touchLeftButton, false);
  },
);
bindHoldButton(
  touchRightButton,
  () => {
    recordSideMoveTap(1);
    touchSteer = 1;
    setTouchButtonActive(touchRightButton, true);
  },
  () => {
    if (touchSteer > 0) touchSteer = 0;
    setTouchButtonActive(touchRightButton, false);
  },
);
bindHoldButton(
  touchBoostButton,
  () => {
    if (!boostActive) playBoostSound();
    boostActive = true;
    setTouchButtonActive(touchBoostButton, true);
  },
  () => {
    boostActive = false;
    setTouchButtonActive(touchBoostButton, false);
  },
);
if (volumeButton) {
  volumeButton.addEventListener("click", () => {
    startAudio({ music: state === "running", audibleUnlock: true }).then(() => {
      setAudioMuted(!audioMuted);
      playButtonSound();
    });
  });
}
if ("serviceWorker" in navigator && window.isSecureContext && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
updateSymptomSurveyValues();
updatePowerupUi();
renderProgressGraph();
