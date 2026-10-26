import { useState } from "react";

// Invisible bot checks for forms that post to /api/send-email:
// a honeypot field people never see and the time the form was loaded.
function SpamGuard() {
  const [loadedAt] = useState(() => Date.now());

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="_ts" defaultValue={loadedAt} />
    </>
  );
}

export default SpamGuard;
