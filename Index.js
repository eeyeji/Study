Const DropArea = Document.QuerySelector(".Drag-Area");
Const DragText = Document.QuerySelector(".Header");

Let Button = DropArea.QuerySelector(".Button");
Let Input = DropArea.QuerySelector("Input");

Let File;

Button.Onclick = () => {
  Input.Click();
};

// When Browse
Input.AddEventListener("Change", Function () {
  File = This.Files[0];
  DropArea.ClassList.Add("Active");
  DisplayFile();
});

// When File Is Inside Drag Area
DropArea.AddEventListener("Dragover", (Event) => {
  Event.PreventDefault();
  DropArea.ClassList.Add("Active");
  DragText.TextContent = "Release To Upload";
  // Console.Log('File Is Inside The Drag Area');
});

// When File Leave The Drag Area
DropArea.AddEventListener("Dragleave", () => {
  DropArea.ClassList.Remove("Active");
  // Console.Log('File Left The Drag Area');
  DragText.TextContent = "Drag & Drop";
});

// When File Is Dropped
DropArea.AddEventListener("Drop", (Event) => {
  Event.PreventDefault();
  // Console.Log('File Is Dropped In Drag Area');

  File = Event.DataTransfer.Files[0]; // Grab Single File Even Of User Selects Multiple Files
  // Console.Log(File);
  DisplayFile();
});

Function DisplayFile() {
  Let FileType = File.Type;
  // Console.Log(FileType);

  Let ValidExtensions = ["Image/Jpeg", "Image/Jpg", "Image/Png"];

  If (ValidExtensions.Includes(FileType)) {
    // Console.Log('This Is An Image File');
    Let FileReader = New FileReader();

    FileReader.Onload = () => {
      Let FileURL = FileReader.Result;
      // Console.Log(FileURL);
      Let ImgTag = `<Img Src="${FileURL}" Alt="">`;
      DropArea.InnerHTML = ImgTag;
    };
    FileReader.ReadAsDataURL(File);
  } Else {
    Alert("This Is Not An Image File");
    DropArea.ClassList.Remove("Active");
  }
}