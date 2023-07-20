import React from "react";

export const FileUploadUI = (): JSX.Element => {
  return (
    <div className="FileUploadUI">
      <div className="Upload-form">
        <input name="file" type="file" accept=".csv" />
        <input type="button" disabled={!File} value="送信" />
      </div>
    </div>
  );
};
