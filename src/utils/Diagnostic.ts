const errors: string[] = [];

function addDiagnostic(value: any) {
    errors.push(`${new Date().toISOString()}: $ERROR: ${value}`);
}
function logError() {
    errors.forEach((error) => {
        console.error(error);
    });
}
function hasError() { 
    return errors.length > 0;
}
function resetDiagnostic() {
    errors.length = 0;
}
const Diagnostic = {
    addDiagnostic,
    logError,
    hasError,
    resetDiagnostic,
}
export default Diagnostic;