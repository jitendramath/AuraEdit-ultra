"use client";

import { useEffect, useState } from "react";

type FileNode = {

  path: string;

};

export default function FileTree() {

  const [files, setFiles] = useState<FileNode[]>([]);

  useEffect(() => {

    let active = true;

    const fetchFiles = async () => {

      try {

        const res = await fetch("/api/project/files");

        if (!res.ok) return;

        const data = await res.json();

        if (active) {

          setFiles(data.files || []);

        }

      } catch {

        // silent fail

      }

    };

    fetchFiles();

    const timer = setInterval(fetchFiles, 2000);

    return () => {

      active = false;

      clearInterval(timer);

    };

  }, []);

  return (

    <div

      style={{

        fontSize: "0.85rem",

        color: "var(--text-secondary)",

        overflowY: "auto"

      }}

    >

      {files.length === 0 && (

        <div>No files yet…</div>

      )}

      {files.map(file => (

        <div

          key={file.path}

          style={{

            padding: "0.25rem 0",

            whiteSpace: "nowrap",

            overflow: "hidden",

            textOverflow: "ellipsis"

          }}

          title={file.path}

        >

          {file.path}

        </div>

      ))}

    </div>

  );

}