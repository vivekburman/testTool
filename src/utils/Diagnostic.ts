const errors: string[] = []
function addDiagnostic(value: any) {
    errors.push(`$ERROR: ${value}`);
}
function logError() {
    errors.forEach((error) => {
        console.error(error);
    });
}
function hasError() { 
    return errors.length > 0;
}
const Diagnostic = {
    addDiagnostic,
    logError,
    hasError,
}
export default Diagnostic;