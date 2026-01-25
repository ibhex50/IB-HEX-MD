const cooldowns = new Map();

function cooldown(user, time = 5000) {
  if (cooldowns.has(user)) return false;
  cooldowns.set(user, true);
  setTimeout(() => cooldowns.delete(user), time);
  return true;
}

module.exports = cooldown;
