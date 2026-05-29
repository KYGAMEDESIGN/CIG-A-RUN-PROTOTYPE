# CIG-A-RUN Mobile PWA Testing And Deployment

## Local Testing

1. Start a local web server from this folder:

   ```sh
   python3 -m http.server 8080
   ```

2. Test on the Mac:

   ```text
   http://localhost:8080/index.html
   ```

3. Test on iPhone or iPad:

   - Use the same Wi-Fi network as the Mac, or use a phone hotspot if public Wi-Fi blocks device-to-device traffic.
   - Open the Mac network URL in Safari, for example:

     ```text
     http://YOUR_MAC_IP:8080/index.html
     ```

4. Add to Home Screen on iPhone or iPad:

   - Open the game in Safari.
   - Tap Share.
   - Tap Add to Home Screen.
   - Launch CIG-A-RUN from the new home-screen icon.

Service workers and install prompts require `https` or `localhost`. For full PWA behaviour on iPhone/iPad, deploy the folder to an HTTPS host.

## Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, create a new project from that repository.
3. Use these settings:
   - Framework Preset: Other
   - Build Command: leave empty
   - Output Directory: `.`
4. Deploy and open the HTTPS URL on iPhone or iPad.

## Netlify

1. Push this folder to GitHub, or drag the folder into Netlify Drop.
2. Use these settings if creating from Git:
   - Build command: leave empty
   - Publish directory: `.`
3. Deploy and open the HTTPS URL on iPhone or iPad.

## GitHub Pages

1. Push the folder contents to a GitHub repository.
2. Go to Settings > Pages.
3. Set Source to Deploy from a branch.
4. Select the branch and root folder.
5. Open the generated HTTPS GitHub Pages URL on iPhone or iPad.
