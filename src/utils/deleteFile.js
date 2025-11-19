import fs from "fs"
import path from "path"

export const deleteFile = async(fileUrl) => {

    try {
        
        if (!fileUrl) {
            return
        }

        const filename = fileUrl.split("/").pop()
        const filePath = path.join("src", "uploads", filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

    } catch (error) {
        console.error(error)
    }

}