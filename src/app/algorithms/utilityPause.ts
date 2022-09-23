export abstract class UtilityPause {
    public static async pause() {
        await new Promise<void>((resolve) =>
            setTimeout(() => {
                resolve();
            }, 75)
        );
    }
}