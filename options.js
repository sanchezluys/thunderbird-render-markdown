function saveOptions(e) {
  let scope = Array.from(document.getElementsByName('scope')).find(
    (option) => option.checked
  ).value;

  let senderEmail = document.getElementById('sender-email').value;
  let enableSenderFilter = document.getElementById('enable-sender-filter').checked;

  browser.storage.sync.set({
    scope: scope,
    senderEmail: senderEmail,
    enableSenderFilter: enableSenderFilter
  });
  e.preventDefault();
}

function restoreOptions() {
  browser.storage.sync.get(['scope', 'senderEmail', 'enableSenderFilter']).then((res) => {
    let scope = res.scope || 'all-plain-text';
    document.getElementById(scope).checked = true;
    
    if (res.senderEmail) {
      document.getElementById('sender-email').value = res.senderEmail;
    }
    
    if (res.enableSenderFilter !== undefined) {
      document.getElementById('enable-sender-filter').checked = res.enableSenderFilter;
    }
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
Array.from(document.getElementsByName('scope')).forEach((option) =>
  option.addEventListener('change', saveOptions)
);
document.getElementById('sender-email').addEventListener('change', saveOptions);
document.getElementById('enable-sender-filter').addEventListener('change', saveOptions);