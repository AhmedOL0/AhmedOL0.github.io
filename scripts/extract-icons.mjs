import * as si from 'simple-icons';

const icons = {
  springboot: 'siSpringboot',
  java: 'siJavascript',
  docker: 'siDocker',
  postgresql: 'siPostgresql',
  redis: 'siRedis',
  typescript: 'siTypescript',
  firebase: 'siFirebase',
  flutter: 'siFlutter',
  python: 'siPython',
  github: 'siGithub',
  githubactions: 'siGithubactions',
  googlecloud: 'siGooglecloud',
  prometheus: 'siPrometheus',
  grafana: 'siGrafana',
  nextjs: 'siNextdotjs',
  react: 'siReact',
  tailwindcss: 'siTailwindcss',
  php: 'siPhp',
  laravel: 'siLaravel',
  arduino: 'siArduino',
  pytorch: 'siPytorch',
  selenium: 'siSelenium',
  jest: 'siJest',
  vite: 'siVite',
  stripe: 'siStripe',
  gemini: 'siGooglegemini',
  expo: 'siExpo',
  flyway: 'siFlyway',
};

const out = {};
for (const [key, val] of Object.entries(icons)) {
  const icon = si[val];
  if (icon) {
    out[key] = icon.path;
  }
}
console.log(JSON.stringify(out));
