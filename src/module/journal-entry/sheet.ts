class JournalSheetNs<TJournalEntry extends JournalEntry> extends JournalSheet<TJournalEntry> {
    override async getData(options?: Partial<DocumentSheetOptions>): Promise<JournalSheetData<TJournalEntry>> {
        const sheetData = await super.getData(options);
        for (const entry of sheetData.toc) {
            entry.number += 1;
        }
        return sheetData;
    }
}

export { JournalSheetNs };
