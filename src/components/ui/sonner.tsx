/*
 * shadcn's own file, with the theme taken out.
 *
 * What the CLI writes reads the theme from `next-themes`, which is Next's
 * and which shadcn's own Vite documentation says a Vite application does not
 * use. Nothing here ever read it: this viewer passes `theme: 'dark'` where
 * the Toaster is rendered, and an explicit prop won that argument every
 * time. So the import went, the dependency with it, and the cast that
 * `exactOptionalPropertyTypes` had forced on the theme it no longer passes.
 *
 * Everything else is stock, and what this application asks of it — how long
 * a message stays, where it sits — is passed in where it is rendered.
 */
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
