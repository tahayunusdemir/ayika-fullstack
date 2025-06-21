import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface KvkkModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function KvkkModal({ open, handleClose }: KvkkModalProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="kvkk-dialog-title"
      aria-describedby="kvkk-dialog-description"
    >
      <DialogTitle id="kvkk-dialog-title">
        KVKK KAPSAMINDA AYDINLATMA METNİ
      </DialogTitle>
      <DialogContent dividers>
        <Box id="kvkk-dialog-description" tabIndex={-1}>
          <Typography paragraph>
            İşbu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun
            ("KVKK") 10. maddesi ve Aydınlatma Yükümlülüğünün Yerine
            Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, veri
            sorumlusu sıfatıyla hareket eden Ayika Platfomu tarafından kişisel
            verilerinizin işlenmesine ilişkin olarak aydınlatma yükümlülüğünün
            yerine getirilmesi amacı ile hazırlanmıştır.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Hangi Kişisel Verilerinizi İşliyoruz?
          </Typography>
          <Typography paragraph>
            Ayika Platformu gönüllülerinin paylaşmasını talep etmiş olduğumuz
            veriler:
          </Typography>
          <Typography paragraph>
            Adı, Soyadı veya Unvanı, T.C. kimlik numarası, İmza, Adres bilgisi,
            E-posta adresi, Telefon numarası, Adli Sicil Kaydı, Sağlık Raporu
            bilgilerinin alınması gerekmektedir.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Kişisel Verileriniz Neden İşlenir?
          </Typography>
          <Typography paragraph>
            Kişisel verileriniz, Ayika Platformu'nda yer alan amaçlar ve çalışma
            konuları doğrultusunda sağlanacak hizmetlerin yasal çerçevede tam ve
            zamanında sunulabilmesi, platformun gönüllüsü olmanız ve buna bağlı
            süreçlerin yürütülmesi amacıyla KVKK'nın 5. ve 6. maddelerinde
            belirtilen kişisel veri işleme şartları ve amaçları dâhilinde
            işlenecektir.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            İşlenen Veriler Kimlere Hangi Amaçla Aktarılabilir?
          </Typography>
          <Typography paragraph>
            İşlenen kişisel verileriniz, Ayika Platformu gönüllüsü olmanız ve buna
            bağlı süreçlerin yürütülmesi için Ayika, bağışçılarımız ve
            destekçilerimizin de dahil olduğu tedarikçiler, iş birliği yapılan
            kurumlar, kanunen yetkili kamu kurumları ve özel kişilere ve kişisel
            verilerinizin yeterli ve gerekli şekilde korunması ve dijital
            altyapıların işletilmesi için dijital araçlar, bilgi teknolojileri,
            sunucu ve sunucu hizmetleri güvenliği ile web sitesi alanında hizmet
            aldığımız şirketlere, belirtilen kişisel veri işleme şartları ve
            amaçları çerçevesinde KVKK'nın 8. ve 9. maddesi kapsamında
            aktarılabilecektir.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Kişisel Veri Toplamanın Yöntemi ile Hukuki Sebebi Nedir?
          </Typography>
          <Typography paragraph>
            Kişisel verileriniz, her türlü sözlü, yazılı ya da elektronik
            ortamda, gönüllülük formu veya diğer bir yolla yukarıda yer verilen
            amaçlar doğrultusunda toplanmaktadır. Bu hukuki sebeple toplanan
            kişisel verileriniz kanunlarda açıkça öngörülmesi, bir sözleşmenin
            kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla,
            sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli
            olması, Ayika Platformu ve Ayika'nın hukuki yükümlülüğünü yerine
            getirebilmesi için zorunlu olması durumları da dahil KVKK'nın 5. ve
            6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları
            kapsamında bu metnin ilk iki kısmında belirtilen amaçlarla da
            işlenebilmekte ve aktarılabilmektedir.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Kişisel Veri Sahibinin Hakları Nelerdir?
          </Typography>
          <Typography paragraph>
            KVKK'nın "İstisnalar" başlıklı 28. maddesinde öngörülen haller saklı
            kalmak kaydıyla, KVVK'nın 11. maddesi çerçevesinde kişisel veri
            sahipleri Ayika Platformu'na başvurarak;
          </Typography>
          <List dense sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item' }}>
              <ListItemText primary="Kişisel verilerinin işlenip işlenmediğini öğrenme," />
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <ListItemText primary="Kişisel verileri işlenmişse buna ilişkin bilgi talep etme," />
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <ListItemText primary="Kişisel verilerinin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme," />
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <ListItemText primary="Yurt içinde veya yurt dışında kişisel verilerinin aktarıldığı üçüncü kişileri bilme," />
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <ListItemText primary="Kişisel verilerinin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme," />
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <ListItemText primary="KVKK'ya ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerinin silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme," />
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <ListItemText primary="İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme," />
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <ListItemText primary="Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme haklarına sahiptir." />
            </ListItem>
          </List>
          <Typography paragraph sx={{ mt: 2 }}>
            Yukarıda belirtilen haklarınızı kullanmak için talebinizi, yazılı veya
            Kişisel Verileri Koruma Kurulu'nun belirlediği diğer yöntemlerle Ayika
            Platformu'na iletebilirsiniz. Yapacağınız başvuru kapsamında
            kimliğinizi tespit edici gerekli bilgiler ile Kanun'un 11. maddesinde
            belirtilen haklardan kullanmayı talep ettiğiniz hakkınıza yönelik
            açıklamalarınızı içeren talebinizi "Levent Mahallesi, İstanbul"
            adresine bizzat elden iletebilir, noter kanalıyla veya
            "ayikadestek@gmail.com" e-posta adresi üzerinden gönderebilirsiniz.
            Başvurunuzda yer alan talepleriniz, talebin niteliğine göre en kısa
            sürede ve en geç otuz gün içinde Ayika Platformu tarafından ücretsiz
            olarak sonuçlandırılacaktır. Ancak işlemin, Ayika Platformu için
            ayrıca bir maliyet gerektirmesi halinde, Kişisel Verileri Koruma
            Kurulu tarafından belirlenen tarifedeki ücret alınacaktır.
          </Typography>
          <Typography paragraph>
            6698 sayılı Kişisel Verilerin Korunması Kanunu'nun "Veri
            Sorumlusunun Aydınlatma Yükümlülüğü" başlıklı 10. maddesi
            gereğince, kişisel verilerimin kim tarafından, hangi amaçla
            işleneceği, işlenen kişisel verilerin kimlere ve hangi amaçla
            aktarılabileceği, kişisel veri toplamanın yöntemi ve hukuki sebebi
            ve Kanun'un 11. maddesinde yer alan haklarım konusunda hazırlanan
            işbu "Bilgilendirme Metnini" okudum, anladım ve veri sorumlusu
            sıfatına sahip Ayika Platformu tarafından bu konuda detaylı olarak
            bilgilendirildim.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Kapat</Button>
      </DialogActions>
    </Dialog>
  );
} 