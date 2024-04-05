"use client";

import { Input } from "@/components/ui/Input/Input";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import { useState } from "react";

export default function EditProfile() {
  const [pageText, setPageText] = useState("");

  return (
    <div>
      <h2>Edit profile</h2>
      <p>Change your profile settings</p>

      <div style={{ marginTop: 20 }}>
        <Input
          type="text"
          placeholder="Min amount"
          label="Minimum donate amount"
        />
        <div style={{ marginTop: 20 }}>
          <Textarea
            value={pageText}
            onChange={(e) => setPageText(e.target.value)}
            placeholder="Your text"
            label="Text on the donation page"
          />
        </div>
        <span style={{ fontSize: 12, marginTop: 12 }}>
          Text will be displayed on the donation page
        </span>
      </div>
    </div>
  );
}