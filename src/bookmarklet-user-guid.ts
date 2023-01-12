type GUID = `${string}-${string}-${string}-${string}-${string}`;
type Email = `${string}@${string}`;

type StringProp<Value extends string> = {
  $type: "System.String";
  $value: Value;
};

type Raw = {
  count: number;
  value: {
    id: GUID;
    providerDisplayName: string;
    customDisplayName: string;
    isActive: boolean;
    properties: {
      Domain: StringProp<GUID>;
      Account: StringProp<Email>;
      Mail: StringProp<Email>;
      "http://schemas.microsoft.com/identity/claims/objectidentifier": StringProp<GUID>;
    };
  }[];
};

type Transformed = {
  id: GUID;
  displayName: string;
  isActive: boolean;
  email: Email;
}[];

(() => {
  // Get org name
  const urlBase = "https://vssps.dev.azure.com";
  const loginUrlBase = "https://vssps.dev.azure.com";
  let org: string | undefined | null;

  if (location.href.startsWith(urlBase) || location.href.startsWith(loginUrlBase)) {
    org = location.href.split("/")[3];
  }
  if (!org) {
    org = prompt("Enter your Azure DevOps organisation name");
  }
  if (!org) {
    return;
  }

  // Compile URL
  const encodedOrg = encodeURIComponent(org);
  const url = `https://vssps.dev.azure.com/${encodedOrg}/_apis/identities?api-version=6.0&searchFilter=General`;

  // Keep going until the user gets what they want
  let searchAgain = false;
  while (true) {
    const filterValueSearchPart = "&filterValue=";
    if (
      searchAgain ||
      location.href.split("?")[0] !== url.split("?")[0] ||
      !location.search.includes(filterValueSearchPart)
    ) {
      // Get search query
      const query = prompt("Enter search query (display name, account name, or unique name)");

      if (!query) {
        return;
      }

      // Redirect to the queried page
      const encodedQuery = encodeURIComponent(query);
      const queryUrl = url + filterValueSearchPart + encodedQuery;
      if (location.href !== queryUrl) {
        alert("Run bookmarklet again to get results...");
        location.href = queryUrl;
        return;
      }
    }

    // Catch not logged in
    const mustLogInError = () => {
      alert("Login to Azure DevOps and then run bookmarklet again...");
      location.href = `${loginUrlBase}/${encodedOrg}`;
      return new Error("Azure DevOps login required");
    };

    if (document.body.textContent?.includes("Please sign-in at least once")) {
      throw mustLogInError();
    }

    // On correct page, get content
    let parsed: Raw;
    try {
      parsed = JSON.parse(document.body.textContent!);
    } catch (e) {
      throw mustLogInError();
    }

    // Transform
    let results: Transformed = parsed.value.map((r) => ({
      id: r.id,
      displayName: r.customDisplayName || r.providerDisplayName,
      isActive: r.isActive,
      email: r.properties.Mail.$value,
    }));

    if (results.length === 0) {
      alert("No results!");
      searchAgain = true;
      continue;
    }

    // Choose option
    const numberedResults = results.map((r, i) => `${i + 1}: ${r.displayName} (${r.email})`);
    const chosenResult = prompt(
      `Enter the number of a result:\n\n${numberedResults.join("\n")}\n${
        numberedResults.length + 1
      }: Change search query\n${numberedResults.length + 2}: Exit`
    );
    const chosenNumber = parseInt(chosenResult || "", 10);

    if (
      Number.isNaN(chosenNumber) ||
      chosenNumber < 1 ||
      chosenNumber > numberedResults.length + 1
    ) {
      return;
    } else if (chosenNumber === numberedResults.length + 1) {
      searchAgain = true;
      continue;
    }
    searchAgain = false;
    const person = results[chosenNumber - 1]!;

    // Display and log result and copy GUID to clipboard
    const personText = `Display Name: ${person.displayName}\nEmail: ${person.email}\nActive: ${
      person.isActive ? "true" : "false"
    }\nIdentity GUID: ${person.id}\n\nGUID will be copied to the clipboard...`;
    const jsonText = JSON.stringify(person, null, 2);
    console.info("Chosen person:");
    console.dir(jsonText);
    alert(personText);
    navigator.clipboard.writeText(person.id);
    return;
  }
})();
