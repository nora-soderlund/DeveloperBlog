type ClipboardResult = {
    error: string | null,
    success: boolean
};

function excecuteCopyTextToClipboard(text: string): Promise<ClipboardResult> {
    return new Promise((resolve) => {
        if(navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                resolve({ error: null, success: true });
            }, (error) => {
                resolve({ error, success: false });
            });
        
            return;
        }
    
        const textArea = document.createElement("textarea");
        textArea.value = text;
    
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
    
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
    
        try {
            const successful = document.execCommand("copy");
    
            if(!successful)
                throw new Error("Failed to copy to clipboard, execution was unsuccesful.");
            
            resolve({ error: null, success: true });
        }
        catch (error: any) {
            resolve({ error, success: false });
        }
        finally {
            document.body.removeChild(textArea);
        }
    });
}

export async function copyTextToClipboard(text: string) {
    const { error, success } = await excecuteCopyTextToClipboard(text);

    const message: string = (success)?("Text has been copied to your clipboard!"):("Failed to copy the text to your clipboard!");
    const event = new CustomEvent("notification", { detail: message })
    window.dispatchEvent(event);

    if(!success)
        console.error(error);
};

export async function copyLinkToClipboard(link: string) {
    const { error, success } = await excecuteCopyTextToClipboard(link);

    const message: string = (success)?("Link has been copied to your clipboard!"):("Failed to copy the link to your clipboard!");
    const event = new CustomEvent("notification", { detail: message })
    window.dispatchEvent(event);

    if(!success)
        console.error(error);
};
