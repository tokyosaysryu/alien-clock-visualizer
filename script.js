const CIRCLE = 677;
const KOURS_PER_ROTATION = 13;
const PINUTES_PER_KOUR = 37;
const TOTAL_PINUTES_PER_ROTATION = KOURS_PER_ROTATION * PINUTES_PER_KOUR;
const MAX_SMALL_ANGLE = CIRCLE / 2;

/**
 * Calculate the smaller angle between the two hands in alien degrees.
 */
function calculateAlienAngle(kour, pinute) {
  if (!Number.isInteger(kour) || kour < 0 || kour >= KOURS_PER_ROTATION) {
    throw new RangeError("Kour must be an integer from 0 to 12.");
  }

  if (!Number.isInteger(pinute) || pinute < 0 || pinute >= PINUTES_PER_KOUR) {
    throw new RangeError("Pinute must be an integer from 0 to 36.");
  }

  const totalPinutes = kour * PINUTES_PER_KOUR + pinute;

  // The kour hand completes one revolution with the planet.
  const kourAngle =
    (totalPinutes * CIRCLE) / TOTAL_PINUTES_PER_ROTATION;

  // The pinute hand rotates in the opposite direction.
  // Therefore relative travel is additive.
  const pinuteTravel =
    (pinute * CIRCLE) / PINUTES_PER_KOUR;

  const relativeAngle =
    (kourAngle + pinuteTravel) % CIRCLE;

  return Math.min(relativeAngle, CIRCLE - relativeAngle);
}

function getHandRotations(kour, pinute) {
  const totalPinutes = kour * PINUTES_PER_KOUR + pinute;

  return {
    kourRotation:
      (totalPinutes / TOTAL_PINUTES_PER_ROTATION) * 360,
    pinuteRotation:
      -(pinute / PINUTES_PER_KOUR) * 360,
  };
}

function toAlienHandAngles(kour, pinute) {
  const totalPinutes = kour * PINUTES_PER_KOUR + pinute;

  const kourAngle =
    (totalPinutes * CIRCLE) / TOTAL_PINUTES_PER_ROTATION;

  const pinuteAngle =
    ((-pinute * CIRCLE) / PINUTES_PER_KOUR + CIRCLE) % CIRCLE;

  return { kourAngle, pinuteAngle };
}

function updateUI() {
  const kourInput = document.getElementById("hour");
  const pinuteInput = document.getElementById("minute");
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  const kour = kourInput.valueAsNumber;
  const pinute = pinuteInput.valueAsNumber;

  try {
    const angle = calculateAlienAngle(kour, pinute);
    const rotations = getHandRotations(kour, pinute);
    const handAngles = toAlienHandAngles(kour, pinute);

    result.textContent = `${angle.toFixed(3)}°`;
    document.getElementById("hour-angle").textContent =
      `${handAngles.kourAngle.toFixed(3)}°`;
    document.getElementById("minute-angle").textContent =
      `${handAngles.pinuteAngle.toFixed(3)}°`;

    document.getElementById("hour-hand").style.transform =
      `rotate(${rotations.kourRotation}deg)`;
    document.getElementById("minute-hand").style.transform =
      `rotate(${rotations.pinuteRotation}deg)`;

    document.getElementById("meter-fill").style.width =
      `${(angle / MAX_SMALL_ANGLE) * 100}%`;

    error.textContent = "";
  } catch (err) {
    result.textContent = "—";
    error.textContent = err.message;
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("hour").addEventListener("input", updateUI);
    document.getElementById("minute").addEventListener("input", updateUI);
    updateUI();
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    calculateAlienAngle,
    getHandRotations,
    toAlienHandAngles,
  };
}
