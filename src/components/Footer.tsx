import React from 'react';
import { useTranslations, type Lang } from '../i18n/translations';

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  const t = useTranslations(lang);

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10 mt-xxl py-16">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
                <img alt="Allan Logo" className="h-6 w-6 grayscale opacity-50"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAEv0lEQVR4AeybyasWRxDA5yUhIRDJRgjkkOQkggsu6MGT4AriDiruuyiC4MH/RMSDB/cFF1BQEFHBiwoq6E30LCIqeFAE8fkrfT5mdLr6669mQ0uqnP66qnr5Tc30TI9+l/kfEwEHaMKXZQ7QARoJGMM9Ax2gkYAx3DPQARoJGMM9Ax2gkYAx3DPQARoJGMO/xQw0IiuGO8Aij+RfDjAZWTHAARZ5JP9ygMnIigEOsMgj+ZcDTEZWDGgU4ODg4EE0JjuLQ+z2r8YAQu0XUCxEY7I25tAle2MAmfR6dAQakwnAnhpz6oq9SYCrEya9JcG3VddGAJJRo5nlZLRXWUyMXPK9+rfm1whAZrcDTRG51DelBLTlWztAMukHJrcMTZXcYpIa2px/7QCZitz7fueYKuOB3/nFpAmAa1LJ5fy35sqdLNYKkAwaxaynoSG5HzIM1S8aOnb2UCtAZr0B1WQPxhtoSEZwEnaFjF2orw0gE5e2VyqTfIXtGHoc1aTTi4lMUhu8xbaY4H/QkFwcGBh4ifEw+gYNyThORmcXkzoBxjJHsi8D4jPIXUA12aYZ27TVApCM+ZtJzUFDItDO5oxHc+Wy4hLa/KPM0HZdLQCZlGSMPEBTLJXTZN67nOUM5SdoSH7GIJsRHLoldQGMXb5y3xsmMQTz9HBFeSHWZnlUzbWVA+RSm82Y/0dD8ghg10uMB0rq8lVjabtzi0nlAJlx7NnvBD5fCFBvURl7sN6OT6ekUoBkiNzo532YYflfg1RrmXYSuyayzSV9aD6N2ioFyMjlRi83fIqlcpNMe1Bq+Vi5n8NbNCTS9saQsY36qgGuikxCzTDgPib+KqqJZXNCa7cvW2UAuXwnMYLxaEjkbeNgyJir//CAnfv9eXEMfXVmMakMILOM3eAvk2HyAI2rKvJuLK94mlPqDrfWlslWJUB599UGI5lzk+xRlQauobLYcAjKQtr5M2ht0FAJQCYjG5+/Rcb9H/YpPeqv+GnSmcWkEoDMVLbtOTQqnViNzQDJPvlk2cZNfSR9T2/0lJV0ZgZIm3L5DnBsQ1r/9GkCSAbIjsvyNsgN9bmAMbT6ZmICyCSWon+hbYksJq3+MxArwNgW0zWe/foWzsr36FNUE3l91Oy12goAU3ri0vkX/xmoJvJQrNlVG+Rl0/WQ6pRlspgEx8E4N6GXFNXeniJdZ6b/sS6Lh3YCPn11iw4i4rAXe+zBejM+IRmJYaaipnuoBoA+VVmnWrPsPBkUeyWLNJHJR6eHWZaVbcBSPSzzyDATiOGWEgt9AWSw8+lH+2SJOYt9KBKfXjV2GctiIldEr+1V5tcXQHqPZd8Tsu8cflXJERp6gWoSG5MW27ctGSDZJ58s50Z6LN22j8QEzZyM1xhPoZrIYjJLc6jDlgyQQcg76I8cNZGdZc3ej21fD0Eyth7cqnPpB+CKSPd3yZh7EZ9kM23eJugOqolsczW6mCQDZCJjUE0majO02Oh0EqrJTxif5/vg925Ukyt5/9RyMsDUDr52fwdoPMMO0AHaCFijPQONBB2gAzQSMIZ7BjpAIwFjuGegAzQSMIZ7BjpAIwFjuGegAzQSMIZ7Bn6DAI1TrjbcM9DI0wE6QCMBY/h7AAAA//83cX6iAAAABklEQVQDAEtIKLASwnUMAAAAAElFTkSuQmCC" />
                <span className="font-label-sm font-black text-on-surface tracking-[0.3em] text-[10px]">ALLAN SYSTEMS</span>
            </div>
            <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest">
              © {new Date().getFullYear()} ALLAN DEVSYSTEMS. {t('footer.rights')}.
            </p>
            <div className="flex gap-8">
                <a className="text-on-surface-variant font-label-sm text-[10px] hover:text-primary transition-colors uppercase tracking-widest" href="#">GitHub</a>
                <a className="text-on-surface-variant font-label-sm text-[10px] hover:text-primary transition-colors uppercase tracking-widest" href="#">LinkedIn</a>
                <a className="text-on-surface-variant font-label-sm text-[10px] hover:text-primary transition-colors uppercase tracking-widest" href="#">Twitter</a>
            </div>
        </div>
    </footer>
  );
}
