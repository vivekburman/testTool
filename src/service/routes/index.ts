import registerRouter from './endpoints';

const CompilerRoutes = {
    registerRoutes: (app: any) => {
        if (typeof app.use === 'function') {
            app.use('/compile', registerRouter);
        }
    }
};
export default CompilerRoutes;