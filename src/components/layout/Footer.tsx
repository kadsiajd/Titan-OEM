export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container-page py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} OEM Product Catalog. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">Built for manufacturers worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
