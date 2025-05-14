import Link from 'next/link';
import classNames from 'classnames';
import './style.scss'

export default function CustomLink(
  { href, variant = "primary", className, children, target }
) {

  if (!href || href === "") { href = "/" };


  return (
    <div className={classNames('btn-link', `btn-${variant}`, className)}>
      <Link href={`${href}`} target={target}>
        {children}
      </Link>
    </div>
  )
}
