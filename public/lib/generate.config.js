import fs from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const file = {
    createWithContent: ({ targetDirectory, filePathName, content }) => {
        fs.writeFileSync(join(targetDirectory, filePathName), content);
        return;
    },
}

const jsonContent = `{
  "backend_url": "${process.env.BACKEND_URL}"
}
`;

file.createWithContent({
    targetDirectory: './public',
    filePathName: 'config.generated.json',
    content: jsonContent,
});

