const fragments = {
  openers: {
    late: [
      "I would have been on time, but",
      "I was actually early, until",
      "I left the house at half six, however",
      "My alarm went off perfectly, but then",
      "I was bang on schedule until",
    ],
    deadline: [
      "The project was nearly done, but",
      "I had it finished last night, until",
      "Everything was on track, but then",
      "I was about to hit send, when",
      "It was 99% complete, but",
    ],
    birthday: [
      "I absolutely remembered your birthday, but",
      "I had a gift wrapped and ready, but",
      "The reminder was in my calendar, however",
      "I planned a surprise do, but",
      "Your card was written and stamped, but then",
    ],
    gym: [
      "I was literally in my gym kit, but",
      "I drove to the gym, but",
      "My protein shake was ready, but",
      "I had my workout playlist queued up, but",
      "I was stretching in the drive when",
    ],
    homework: [
      "The homework was done, but",
      "I finished it at midnight, but then",
      "It was saved on my laptop, until",
      "I had it in my rucksack, but",
      "I triple-checked it last night, but",
    ],
    meeting: [
      "I was about to join the call, but",
      "My camera was on and everything, but then",
      "I clicked the Teams link, however",
      "I had the agenda open and was ready, but",
      "I was in the waiting room when",
    ],
    deploy: [
      "The deploy was green across the board, but",
      "CI/CD was passing beautifully, until",
      "I clicked merge to main, but then",
      "The pipeline was halfway through, when",
      "Everything worked on my machine, however",
    ],
    standup: [
      "I was about to unmute for standup, but",
      "I had my update ready and everything, but then",
      "I joined the standup on time, however",
      "My Jira board was pulled up and ready, but",
      "I was literally typing 'no blockers' when",
    ],
    pr: [
      "I was about to review your PR, but",
      "I had the diff open in two tabs, but then",
      "I left a comment and was about to approve, when",
      "I was halfway through the code review, but",
      "Your PR was next in my queue, however",
    ],
  },

  villains: [
    "a rogue seagull",
    "my neighbour's emotional support hedgehog",
    "a gang of foxes in tiny waistcoats",
    "a time-travelling badger",
    "the ghost of a Victorian postman",
    "a suspiciously polite swan",
    "my cat's evil twin",
    "a flash mob of mime artists from Camden",
    "an escaped penguin from London Zoo",
    "a sentient Henry hoover",
    "a rogue GitHub Action",
    "the ghost in the CI pipeline",
    "a self-aware Kubernetes pod",
    "an intern with production access",
    "a Jira ticket that refused to close",
  ],

  actions: [
    "nicked my car keys",
    "blocked my front door",
    "hacked into my broadband",
    "reorganised my entire flat",
    "challenged me to a staring contest",
    "started a philosophical debate with me over a cuppa",
    "needed me to translate ancient runes",
    "held my laptop hostage",
    "replaced my trainers with crumpets",
    "ate my last Jaffa Cake and my will to live",
    "mass-deleted the staging environment",
    "force-pushed to main",
    "opened 47 blocking PRs simultaneously",
    "deployed a config change to prod at 4:59 on Friday",
    "renamed every variable to 'x'",
  ],

  resolutions: [
    "and I had to negotiate using only interpretive dance.",
    "and the situation required a full PowerPoint presentation to resolve.",
    "so naturally I had to build a tiny catapult out of teaspoons.",
    "and by the time I escaped, three hours had passed.",
    "and the fire brigade said they'd never seen anything like it.",
    "and honestly, I'm still not sure how I got out of it.",
    "and I had to bribe them with exactly 47 digestive biscuits.",
    "and I'm now legally obligated to attend their birthday party in Croydon.",
    "so I had to ring 999 and explain the whole thing from scratch.",
    "and long story short, I now own a goat called Gerald.",
    "and DevOps said we're not allowed to talk about it.",
    "and the rollback took longer than the original sprint.",
    "so I had to mass-revert using only vim and sheer willpower.",
    "and Slack went absolutely mental for about three hours.",
    "and we've now got a runbook specifically because of this incident.",
  ],
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateExcuse(category) {
  const openers = fragments.openers[category];
  if (!openers) {
    throw new Error(`Unknown category: ${category}`);
  }

  const opener = pickRandom(openers);
  const villain = pickRandom(fragments.villains);
  const action = pickRandom(fragments.actions);
  const resolution = pickRandom(fragments.resolutions);

  return `${opener} ${villain} ${action}, ${resolution}`;
}

function getCategories() {
  return Object.keys(fragments.openers);
}

module.exports = { generateExcuse, getCategories };
