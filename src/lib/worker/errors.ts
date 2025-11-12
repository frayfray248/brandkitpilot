export class BrandKitError extends Error {
    constructor(
        message: string,
        public readonly code: string,
        public readonly brandKitId?: string
    ) {
        super(message);
        this.name = 'BrandKitError';
    }
}

export class FrameworkNotFoundError extends BrandKitError {
    constructor(frameworkSlug: string) {
        super(`Framework not found: ${frameworkSlug}`, 'FRAMEWORK_NOT_FOUND');
    }
}

export class AIGenerationError extends BrandKitError {
    constructor(message: string, brandKitId?: string) {
        super(message, 'AI_GENERATION_ERROR', brandKitId);
    }
}

export class ValidationError extends BrandKitError {
    constructor(message: string) {
        super(message, 'VALIDATION_ERROR');
    }
}